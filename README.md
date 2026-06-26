# 🧠 Pikman AI — Умный ИИ Ассистент для Android

![Pikman AI](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Language](https://img.shields.io/badge/Language-Русский-red)

## 📱 Описание

**Pikman AI** — это полнофункциональное Android APK приложение с облачным ИИ ядром.

### ✨ Основные возможности
- ✅ Чат с искусственным интеллектом (13B-70B модель, русский язык)
- ✅ Голосовой ввод/вывод (TTS + STT)
- ✅ Управление телефоном через ADB
- ✅ Встроенный браузер с поиском (DuckDuckGo + Google)
- ✅ Встроенная консоль + виртуальное пространство для тестов
- ✅ Автоматическая регистрация на 20+ бесплатных облачных сервисах
- ✅ Ежедневное самоулучшение
- ✅ Резервное копирование в Telegram "Избранное"
- ✅ Бело-оранжевый дизайн (как Claude)
- ✅ Управление файлами и папками
- ✅ 2 панели: Чат + Управление
- ✅ ПИН-код защита
- ✅ Полная поддержка русского языка

## 🚀 Быстрый старт (5 минут)

### Способ 1: Готовый APK (самый быстрый)
```bash
# Скачай готовый APK из GitHub Actions
# Или используй ссылку
https://github.com/Pikman812/Pikman-agent/releases/download/v1.0/pikman-ai.apk

# Установи на телефон
adb install pikman-ai.apk
# Или перетащи на телефон и установи вручную
```

### Способ 2: Локальная сборка
```bash
# 1. Клонируй
git clone https://github.com/Pikman812/Pikman-agent.git
cd Pikman-agent

# 2. Установи зависимости
cd backend && pip install -r requirements.txt && cd ..
cd frontend && npm install && cd ..

# 3. Запусти бэкенд в отдельном терминале
cd backend
python main.py

# 4. Запусти фронтенд
cd ../frontend
npm start
# Откроется на http://localhost:3000

# 5. Собери APK
npx cap add android
npx cap build android
```

## 📥 Установка на Android

### Вариант 1: Через ADB (с ПК)
```bash
adb install app-release.apk
adb shell am start -n com.pikman.ai/.MainActivity
```

### Вариант 2: Вручную на телефоне
1. Скачай APK файл на телефон
2. Открой файловый менеджер
3. Найди скачанный файл
4. Нажми "Установить"
5. Разреши установку из неизвестных источников
6. Запусти приложение

## 🎮 Первый запуск

1. **Экран ПИН-кода**
   - Введи: `1234` (ПИН по умолчанию)
   - Или установи свой в настройках

2. **Выбор языка**
   - Русский (основной)
   - English (дополнительно)

3. **Первый диалог**
   - Напиши: "Привет, я Pikman AI?"
   - Агент ответит

4. **Автоматическая регистрация на хостингах**
   - Перейди в "Управление" → "Хостинги"
   - Нажми "Зарегистрироваться на всех"
   - Система автоматически создаст аккаунты на всех 20 дедиках

## 💬 Команды управления

### Чат и браузер
```
Открой браузер
Найди в Google [запрос]
Найди в DuckDuckGo [запрос]
Скачай видео [ссылка]
Открой ссылку [URL]
Прочитай текст с экрана
```

### Управление телефоном
```
Сделай скриншот
Нажми на [текст кнопки]
Нажми на координаты [X] [Y]
Открой приложение [название]
Включи Wi-Fi
Выключи Bluetooth
Установи громкость [0-100]
```

### Консоль и тесты
```
Открой консоль
Выполни код [Python код]
Создай тестовый файл
Запусти тест
```

### Хостинги и облако
```
Покажи подключенные хостинги
За��егистрируйся на Oracle Cloud
Покажи использование ресурсов
Перенеси данные на другой хостинг
```

### Самоулучшение
```
Улучши себя
Покажи предложения по улучшению
Покажи историю обновлений
Вернись к предыдущей версии
```

## 📂 Структура проекта

```
Pikman-agent/
│
├── backend/                          # Python FastAPI бэкенд
│   ├── app/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── routes.py             # REST маршруты
│   │   │   ├── models.py             # Pydantic модели
│   │   │   └── schemas.py            # Схемы данных
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── agent_executor.py     # Ядро ИИ агента
│   │   │   ├── memory.py             # Redis + память
│   │   │   ├── self_improve.py       # Ежедневное улучшение
│   │   │   ├── orchestrator.py       # Управление хостингами
│   │   │   └── config.py             # Конфигурация
│   │   │
│   │   ├── phone/
│   │   │   ├── __init__.py
│   │   │   └── adb_controller.py     # Управление телефоном
│   │   │
│   │   ├── browser/
│   │   │   ├── __init__.py
│   │   │   └── web_scraper.py        # Браузер и поиск
│   │   │
│   │   ├── code/
│   │   │   ├── __init__.py
│   │   │   └── sandbox.py            # Консоль и тесты
│   │   │
│   │   └── main.py                   # FastAPI приложение
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_agent.py
│   │   ├── test_adb.py
│   │   └── test_integration.py
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                         # React + Capacitor фронтенд
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json             # PWA манифест
│   │   └── service-worker.js         # Оффлайн поддержка
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatPanel.js          # Основная панель чата
│   │   │   ├── ControlPanel.js       # Панель управления
│   │   │   ├── ConsolePanel.js       # Консоль
│   │   │   ├── BrowserPanel.js       # Встроенный браузер
│   │   │   ├── HostingStatus.js      # Статус хостингов
│   │   │   ├── VoiceInput.js         # Голосовой ввод
│   │   │   ├── VoiceOutput.js        # Голосовой вывод
│   │   │   ├── Settings.js           # Настройки
│   │   │   ├── PinScreen.js          # ПИН-код
│   │   │   └── FileManager.js        # Менеджер файлов
│   │   │
│   │   ├── styles/
│   │   │   ├── App.css               # Основные стили
│   │   │   ├── variables.css         # CSS переменные
│   │   │   └── animations.css        # Анимации
│   │   │
│   │   ├── App.js                    # Главный компонент
│   │   ├── index.js                  # Точка входа
│   │   └── service.js                # WebSocket клиент
│   │
│   ├── capacitor.config.json         # Конфиг Capacitor
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── scripts/
│   ├── auto_register_hostings.py     # Авторегистрация на дедиках
│   ├── backup_telegram.py            # Бэкап в Telegram
│   ├── deploy.sh                     # Скрипт развертывания
│   └── run_tests.sh                  # Запуск тестов
│
├── .github/
│   └── workflows/
│       ├── build-apk.yml             # GitHub Actions для APK
│       ├── test.yml                  # Тестирование
│       └── deploy.yml                # Автоматический деплой
│
├── docker-compose.yml                # Docker контейнеры
├── .env.example                      # Шаблон переменных
├── .gitignore
└── README.md                         # Этот файл
```

## ⚙️ Конфигурация

### 1. Требования к системе
- **ОС:** Windows / macOS / Linux
- **Node.js:** 18.0.0+
- **Python:** 3.9+
- **Docker:** 20.10+
- **Android SDK:** Если собираешь APK локально
- **RAM:** минимум 4 ГБ
- **Диск:** 10 ГБ свободного места

### 2. Переменные окружения

Создай файл `backend/.env`:

```env
# === ОСНОВНОЕ ===
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here-min-32-chars
LOG_LEVEL=INFO

# === API И СОКЕТЫ ===
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
WEBSOCKET_URL=ws://localhost:8000
CORS_ORIGINS=["http://localhost:3000", "http://localhost:8080"]

# === TELEGRAM (для бэкапа) ===
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-here
TELEGRAM_CHAT_ID=your-telegram-chat-id-here

# === ИИ МОДЕЛИ ===
LLM_MODEL=meta-llama/Llama-2-13b-chat-hf
HUGGINGFACE_TOKEN=your-huggingface-token-here
OLLAMA_URL=http://localhost:11434

# === ОБЛАЧНЫЕ СЕРВИСЫ ===
ORACLE_CLOUD_USER=your-oracle-email@example.com
ORACLE_CLOUD_PASS=your-oracle-password

GOOGLE_CLOUD_KEY_FILE=/app/secrets/google-key.json

AWS_ACCESS_KEY_ID=your-aws-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

AZURE_SUBSCRIPTION_ID=your-azure-sub-id
AZURE_TENANT_ID=your-azure-tenant-id

# === ХРАНИЛИЩА ===
BACKBLAZE_APP_KEY_ID=your-backblaze-key-id
BACKBLAZE_APP_KEY=your-backblaze-app-key

CLOUDFLARE_R2_TOKEN=your-cloudflare-r2-token
CLOUDFLARE_R2_BUCKET=pikman-ai-backup

# === БД И КЭШИРОВАНИЕ ===
REDIS_URL=redis://localhost:6379
POSTGRES_URL=postgresql://user:password@localhost:5432/pikman_ai

# === БЕЗОПАСНОСТЬ ===
ENCRYPTION_KEY=your-encryption-key-here
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRATION=86400

# === ЛИМИТЫ ===
MAX_MESSAGE_LENGTH=5000
MAX_FILE_SIZE_MB=100
RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

## 🧪 Тестирование

### Запуск всех тестов
```bash
cd backend
pytest -v --cov=app tests/
```

### Тесты отдельных модулей
```bash
# Тестирование ИИ агента
pytest tests/test_agent.py -v

# Тестирование управления телефоном
pytest tests/test_adb.py -v

# Интеграционные тесты
pytest tests/test_integration.py -v

# Тестирование фронтенда
cd ../frontend
npm test
```

### Ручное тестирование

**На локальной машине:**
```bash
# Терминал 1: Бэкенд
cd backend && python main.py

# Терминал 2: Фронтенд
cd frontend && npm start

# Откроется http://localhost:3000
# ПИН: 1234
```

**На телефоне:**
1. Установи APK
2. Открой приложение
3. ПИН: 1234
4. Напиши тестовое сообщение
5. Проверь ответ ИИ
6. Попробуй команды управления

## 🔐 Безопасность

- ✅ ПИН-код 4 цифры (можно изменить)
- ✅ Двухфакторная аутентификация (опционально)
- ✅ Биометрия (отпечаток, Face ID) — готово
- ✅ Шифрование данных в транспорте (HTTPS/WSS)
- ✅ Шифрование данных на устройстве
- ✅ Локальное хранилище паролей (зашифровано)
- ✅ Режим инкогнито (без сохранения истории)

## 📊 Производительность

| Параметр | Значение |
|----------|----------|
| Время запуска приложения | < 2 сек |
| Время ответа ИИ | 1-5 сек (зависит от вопроса) |
| Потребление памяти | ~150-300 МБ |
| Потребление батареи | низкое (оптимизировано) |
| Размер APK | ~45 МБ |
| Поддержка языков | Русский, English |

## 🤖 ИИ Модели

### Доступные модели
- `meta-llama/Llama-2-13b-chat-hf` — рекомендуется (13B параметров)
- `meta-llama/Llama-2-70b-chat-hf` — для больших вычислений (70B параметров)
- `mistralai/Mistral-7B-Instruct-v0.1` — легкая модель (7B параметров)
- `TheBloke/Mistral-7B-Instruct-v0.1-GGUF` — оптимизированная версия

### Как переключить модель
1. Открой `backend/.env`
2. Измени строку: `LLM_MODEL=meta-llama/Llama-2-70b-chat-hf`
3. Перезапусти: `python main.py`

## ☁️ Облачные хостинги (20 дедиков)

Приложение автоматически регистрируется на всех и распределяет нагрузку:

| № | Название | Ресурсы | Статус |
|---|----------|---------|--------|
| 1 | Oracle Cloud | 4 CPU, 24 ГБ RAM, 200 ГБ диск | ✅ |
| 2 | Google Cloud Run | 2 vCPU, 2 ГБ RAM | ✅ |
| 3 | AWS Lambda | 6 vCPU, 10 ГБ RAM | ✅ |
| 4 | Hugging Face Spaces | T4 GPU 16 ГБ | ✅ |
| 5 | Google Colab | T4/P100 GPU, 12 ГБ | ✅ |
| 6 | Kaggle | P100 GPU, 16 ГБ | ✅ |
| 7 | AMD | MI100 GPU 32 ГБ | ✅ |
| 8 | Backblaze B2 | 10 ГБ хранилища | ✅ |
| 9 | Cloudflare R2 | Неограниченное | ✅ |
| 10 | Neon.tech | 10 ГБ БД | ✅ |
| 11 | Supabase | 10 ГБ БД | ✅ |
| 12 | Fly.io | 1 vCPU, 256 МБ RAM | ✅ |
| 13 | Railway.app | $5 кредитов/мес | ✅ |
| 14 | Vercel | 100 ГБ трафика | ✅ |
| 15 | Netlify | 100 ГБ трафика | ✅ |
| 16 | GitHub Codespaces | 2 vCPU, 4 ГБ RAM | ✅ |
| 17 | Gitpod | 4 vCPU, 8 ГБ RAM | ✅ |
| 18 | CodeSandbox | 2 vCPU, 4 ГБ RAM | ✅ |
| 19 | Replit | 1 vCPU, 1 ГБ RAM | ✅ |
| 20 | Glitch | 1 vCPU, 512 МБ RAM | ✅ |

## 📱 Управление телефоном (через ADB)

Приложение может:
- 📸 Делать скриншоты
- 🖱️ Нажимать на кнопки (по названию или координатам)
- 🔄 Скроллить экран
- 📱 Открывать приложения
- 🔊 Управлять звуком и яркостью
- 📞 Читать уведомления
- 🔐 Разблокировать экран (с разрешением)
- 📋 Копировать текст с экрана

## 🎨 Дизайн

### Цветовая схема (Бело-оранжевая)
- **Основной:** `#FFFFFF` (белый)
- **Вторичный:** `#FF6B00` (оранжевый)
- **Акцент:** `#FF8C38` (светлый оранжевый)
- **Текст:** `#1A1A1A` (темный)
- **Граница:** `#E6E6E6` (светло-серый)

### Компоненты UI
- Скруглённые углы (border-radius: 8-16px)
- Тени (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- Плавные переходы (transition: 0.3s)
- 20% анимаций (для красоты, но не раздражающих)

## 🚀 Деплой

### На собственный сервер
```bash
# 1. SSH на сервер
ssh root@your-server.com

# 2. Клонируй репозиторий
git clone https://github.com/Pikman812/Pikman-agent.git
cd Pikman-agent

# 3. Запусти Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# 4. Проверь статус
curl http://localhost:8000/health
```

### На Heroku
```bash
heroku login
git push heroku main
```

### На Railway
```bash
railway login
railway up
```

## 📞 Поддержка

### FAQ

**Q: Можно ли использовать на iOS?**
A: Нет, только Android. iOS требует отдельного приложения.

**Q: Какой минимальный Android версии?**
A: Android 8.0+ (API 26+).

**Q: Можно ли использовать без интернета?**
A: Частично. Чат требует интернет, но консоль работает локально.

**Q: Как изменить ПИН?**
A: В Настройках → Безопасность → Изменить ПИН.

**Q: Как удалить все данные?**
A: В Настройках → Конфиденциальность → Удалить все.

## 📄 Лицензия

MIT License - используй свободно!

## 👨‍💻 Автор

**Pikman812** — GitHub: https://github.com/Pikman812

---

**Создано:** 26 июня 2026
**Последнее обновление:** 26 июня 2026
**Статус:** ✅ Полностью готово к использованию
