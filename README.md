# Cyrillify - Исправление русской раскладки

**Cyrillify** - это удобное расширение для Chrome, которое мгновенно исправляет текст, набранный в неправильной раскладке. Больше не нужно вручную перепечатывать "ghbdtn" в "привет" - просто выделите текст и нажмите сочетание клавиш!

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/your-extension-id?color=blue&label=Chrome%20Web%20Store)](https://chrome.google.com/webstore/detail/cyrillify/your-extension-id)
[![GitHub license](https://img.shields.io/github/license/yourusername/cyrillify)](https://github.com/yourusername/cyrillify/blob/main/LICENSE)
![GitHub stars](https://img.shields.io/github/stars/yourusername/cyrillify?style=social)

## ✨ Особенности

- 🔄 Мгновенное исправление текста в неправильной раскладке
- ⌨️ Поддержка горячих клавиш (Alt+Shift+F / Cmd+Shift+F)
- 📌 Контекстное меню для быстрого доступа
- 🎛️ Включение/выключение расширения одним кликом
- 🌐 Работает на всех сайтах (кроме системных страниц)

## 🖼️ Скриншоты

| Интерфейс расширения | Работа в браузере |
|----------------------|-------------------|
| ![Popup Interface](https://via.placeholder.com/400x600/4cc9f0/ffffff?text=Интерфейс+Cyrillify) | ![Browser Demo](https://via.placeholder.com/400x600/4361ee/ffffff?text=Демонстрация+работы) |

## ⚙️ Установка

### Установка из Chrome Web Store
1. Перейдите на [страницу расширения](https://chrome.google.com/webstore/detail/cyrillify/your-extension-id) в Chrome Web Store
2. Нажмите "Установить"
3. Подтвердите установку

### Установка из исходного кода
```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/cyrillify.git

# Перейдите в директорию проекта
cd cyrillify

# Загрузите распакованное расширение в Chrome:
1. Откройте chrome://extensions/
2. Включите "Режим разработчика"
3. Нажмите "Загрузить распакованное расширение"
4. Выберите директорию проекта
```

## 🚀 Использование

1. Выделите текст с неправильной раскладкой (например: `ghbdtn` или `руддщ`)
2. Используйте один из способов:
   - **Горячая клавиша**: `Alt+Shift+F` (Win/Linux) или `Cmd+Shift+F` (Mac)
   - **Контекстное меню**: Правый клик → "Исправить раскладку"
3. Текст автоматически преобразуется (например: `привет` или `hello`)

## 🛠️ Технологии

![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🌟 Особенности кода

- **Manifest v3** - современный стандарт расширений Chrome
- **Оптимизированный алгоритм** преобразования текста
- **Кросс-платформенная поддержка** (Windows, macOS, Linux)
- **Локализованный интерфейс** на русском языке

## 📂 Структура проекта

```
cyrillify/
├── icons/               # Иконки расширения
│   └── icon128.png      # Основная иконка
├── src/                 # Исходный код
│   ├── background.js    # Фоновый скрипт
│   ├── popup.js         # Логика всплывающего окна
│   └── popup.html       # Интерфейс расширения
├── README.md            # Этот файл
├── LICENSE              # Лицензия
└── manifest.json        # Конфигурация расширения
```

## 🤝 Участие в разработке

Мы приветствуем вклад в развитие проекта! Чтобы внести свой вклад:

1. Форкните репозиторий
2. Создайте ветку для своей функции (`git checkout -b feature/amazing-feature`)
3. Сделайте коммит изменений (`git commit -m 'Add some amazing feature'`)
4. Запушьте ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📜 Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. в файле [LICENSE](LICENSE).

---

**Cyrillify** © 2023 - Ваше решение для работы с русской раскладкой в браузере!
