document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggle-switch');
  const statusDiv = document.getElementById('status');
  const hotkeyWin = document.getElementById('hotkey-win');
  const hotkeyMac = document.getElementById('hotkey-mac')
  
  // Определение ОС и отображение соответствующих горячих клавиш
  chrome.runtime.getPlatformInfo((info) => {
    if (info.os === 'mac') {
      hotkeyWin.style.display = 'none';
      hotkeyMac.style.display = 'none';
    }
  });

  // Загрузка состояния расширения
  chrome.storage.local.get('extensionEnabled', (data) => {
    const isEnabled = data.extensionEnabled !== false;
    toggleSwitch.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Обработка переключателя
  toggleSwitch.addEventListener('change', () => {
    const isEnabled = toggleSwitch.checked;
    chrome.storage.local.set({ extensionEnabled: isEnabled });
    updateStatus(isEnabled);
    chrome.runtime.sendMessage({ action: 'toggleExtension', enabled: isEnabled });
  });

  // Обновление статуса
  function updateStatus(isEnabled) {
    statusDiv.textContent = isEnabled 
      ? 'Расширение активно' 
      : 'Расширение отключено';
      
    statusDiv.className = isEnabled 
      ? 'status active' 
      : 'status inactive';
  }
});