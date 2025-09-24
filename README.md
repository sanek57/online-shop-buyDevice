# Интренет магазин электронники

## backend

- dotenv - чтение переменных среды
- nodemon
- uuid - генерация уникальных id

- express
    - cors
    - express-fileupload - работа с загруженными файлами на сервер
        - раздача статичных файлов сервером
    - express-validator - валидация данных

- postgresSQL
    - sequelize
    - pg
    - pg-hstore

- jsonwebtoken
    - bcryptjs - для accessToken
    - cookie-parser - для refreshToken
    
- nodemailer - для отправки писем на почту

---
- диаграмма базы данных
- авторизаци пользователя по JWT
    - создание access & refresh tokens
    - отправка письма на почту для подтверждении регистрации - Gmail OAuth2
    - refresh token
        - сохраняем в базе
        - передаем в cookie

- Rest API 
- реализация MVC
    - отдельно модель (model.ts)
    - отдельно бизнес логика (...Service.js)
    - отдельно контроллер (...Controller.js)

## frontend

- ReactTS
- react-bootstap - npm i react-bootstrap bootstrap
- axios
- react-router-dom
- MobX
- jwt-decode
- axios-auth-refresh - обработка 401 -
    intersceptor для обработки 401 ответов с сервера - суть в том что идет запрос на refresh токена только на 1 попавшийся ответ с 401, остальные невалидные запросы перезапрашиваются уже с актуальным токеном - т.е. не будут тоже вызывать refresh

---

API

Users: /api/users
GET
POST
DELETE

Devices: /api/device
GET
POST

Type: /api/type
GET
POST

Brand: /api/brand
GET
POST