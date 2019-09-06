# Server JS Boilerplate

Instlación de dependencias:

    $ npm install

Arrancar el servicio:

    # rethinkdb --bind all --http-port 9090

Arrancar desarrollo de archivos estáticos con webpack:

    $ npm run src:dev

Arrancar modo de desarrollo la aplicación web:

    $ npm run start:dev

### Comandos backup de MongoDB

    $ mongodump --db chat_db --host localhost --port 27017 --out db

### Comandos restore de MongoDB

    $ mongorestore --db chat_db --host localhost --port 27017 db/chat_db

---

Fuentes:

+ https://koajs.com/#application
+ https://github.com/koajs/static
+ https://stackoverflow.com/questions/37009352/how-to-handle-a-404-in-koa-2
+ https://stackoverflow.com/questions/49633157/how-do-i-set-headers-to-all-responses-in-koa-js
+ https://github.com/koajs/trie-router
+ https://github.com/koajs/ejs
+ https://github.com/pepeul1191/express-nodejs-v3
+ https://www.npmjs.com/package/koa-socket-2
+ https://www.educba.com/websocket-vs-socket-io/
+ https://libraries.io/bower/socket.io
+ https://gist.github.com/anandgeorge/281493
+ https://github.com/neumino/thinky/tree/master/examples
+ https://stackoverflow.com/questions/51187233/how-i-can-use-mongoose-and-koa-js
+ https://github.com/pepeul1191/tutoriales/blob/master/RethinkDB.md
+ https://www.npmjs.com/package/js-yaml
+ https://medium.com/trabe/the-elegance-of-asynchronous-middleware-chaining-in-koa-js-ea965f337e63
+ https://stackoverflow.com/questions/42964102/syntax-for-async-arrow-function
+ https://github.com/koajs/session
+ https://stackoverflow.com/questions/55872109/how-to-upload-file-using-koa
+ https://www.npmjs.com/package/fs-extra

Fuentes Template

+ https://startbootstrap.com/previews/modern-business/
