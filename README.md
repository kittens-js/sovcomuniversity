# Установка

## Фронтенд
* `cd frontend`
* `npm i`
* Создать файл `.env.development.local`:
```sh
BACKEND_URL="http://127.0.0.1:8000"
```

## Бекенд
* `cd backend`
* `npm i -g pnpm`
* `pnpm i`
* Создать файл `.env.dev`:
```sh
HOST=0.0.0.0
PORT=8000

JWT_SECRET=(jwt секрет)
JWT_EXPIRY=1d
JWT_REFRESH_EXPIRY=7d
JWT_COOKIE_PATH=/api

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=(пользователь бд)
DB_PASSWORD=(пароль от бд)
DB_DATABASE=(название бд)
```

# Запуск

## Фронтенд
* `cd frontend`
* `npm start`

## Бекенд
* `cd backend`
* `pnpm dev`

