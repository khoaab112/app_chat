#server
```bash
/app
├── config/
│   ├── db.conf.js
│   ├── app.conf.js
│   ├── app.keys.js
│   ├── db.keys.js
│   ├── init.js
├── database/
│   ├── Redis.database.js
│   ├── Mongo.database.js
│   ├── init.js
├── routes/
│   ├── App.routes.js
│   ├── Auth.routes.js
│   ├── Dashboard.routes.js
├── utils/
│   ├── Logger.util.js
├── middleware/
│   ├── App.middleware.js
│   ├── ErrorHandler.middleware.js
│   ├── init.js
├── models/
│   ├── User.model.js
├── controllers/
│   ├── App.controller.js
│   ├── User.controller.js
├── helpers/
│   ├── App.helper.js
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── support/
│   │   ├── index.ejs
│   ├── documentation/
│   │   ├── index.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
/public
├── dist/
├── images/
│   ├── dashboard/
│   ├── auth/
│   ├── documentation/      
├── sitemap.xml
/samples
├── .env.sample
├── db.conf.sample
├── app.conf.sample
├── app.keys.sample
/src
├── javascript/
├── css/
/node_modules
/server.js
/package.json
/.env
```

# clear cache
```javascript
    yarn cache clean
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/khoaab112/app_chat.git
```

Go to the project directory

```bash
  cd app_chat/server
```

Install dependencies

```bash
  yarn install
```
config environment

Start the server

```bash
  yarn dev
```





