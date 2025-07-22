let extensionEnabled = true;
const extensionName = "Cyrillify";

const enToRuMap = {
  'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з',
  '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л',
  'l': 'д', ';': 'ж', "'": 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь',
  ',': 'б', '.': 'ю', '/': '.', '`': 'ё'
};

// Инициализация
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ extensionEnabled: true });
  chrome.contextMenus.create({
    id: "fix-layout",
    title: "Исправить раскладку",
    contexts: ["selection"]
  });
});

// Загрузка состояния
chrome.storage.local.get('extensionEnabled', (data) => {
  if (data.extensionEnabled !== undefined) {
    extensionEnabled = data.extensionEnabled;
  }
});

// Обработчик сообщений
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleExtension') {
    extensionEnabled = message.enabled;
  }
});

// Функции преобразования текста
function fixTextLayout(text) {
  return text.split('').map(char => 
    enToRuMap[char.toLowerCase()] 
      ? (char === char.toLowerCase() 
          ? enToRuMap[char] 
          : enToRuMap[char.toLowerCase()].toUpperCase())
      : char
  ).join('');
}

function shouldFixText(text) {
  return /[a-zA-Z]/.test(text) && !/[а-яА-ЯЁё]/.test(text);
}

function isSystemPage(url) {
  return [
    'chrome://', 'about:', 'edge://', 
    'opera://', 'vivaldi://', 'brave://'
  ].some(prefix => url?.startsWith(prefix));
}

// Контекстное меню
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fix-layout" && info.selectionText && extensionEnabled) {
    processTextFix(tab, info.selectionText);
  }
});

// Горячие клавиши
chrome.commands.onCommand.addListener((command) => {
  if (command === "fix-selected-text" && extensionEnabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => window.getSelection().toString()
        }, (results) => {
          if (results?.[0]?.result) {
            processTextFix(tabs[0], results[0].result);
          }
        });
      }
    });
  }
});

// Основная обработка
function processTextFix(tab, text) {
  if (!extensionEnabled || !text || isSystemPage(tab?.url)) return;
  
  if (shouldFixText(text)) {
    const fixedText = fixTextLayout(text);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [fixedText],
      function: replaceSelectedText
    }).catch(error => {
      console.error(`${extensionName} error:`, error);
    });
  }
}

// Замена текста на странице
function replaceSelectedText(newText) {
  const activeEl = document.activeElement;
  const tag = activeEl.tagName.toLowerCase();
  
  try {
    if (tag === "textarea" || (tag === "input" && 
        /text|search|email|url|password/i.test(activeEl.type))) {
          
      const start = activeEl.selectionStart;
      const end = activeEl.selectionEnd;
      
      activeEl.value = activeEl.value.slice(0, start) + newText + activeEl.value.slice(end);
      activeEl.selectionStart = activeEl.selectionEnd = start + newText.length;
      
      // События для фреймворков
      activeEl.dispatchEvent(new Event('input', { bubbles: true }));
      activeEl.dispatchEvent(new Event('change', { bubbles: true }));
    } 
    else if (activeEl.isContentEditable) {
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
      }
    } 
    else {
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
      }
    }
  } catch (error) {
    console.error(`${extensionName} replacement error:`, error);
  }
}

// Обновление контекстного меню
chrome.storage.onChanged.addListener((changes) => {
  if (changes.extensionEnabled) {
    extensionEnabled = changes.extensionEnabled.newValue;
    chrome.contextMenus.update("fix-layout", {
      enabled: extensionEnabled,
      title: extensionEnabled 
        ? "Исправить раскладку" 
        : "Исправить раскладку (отключено)"
    });
  }
});