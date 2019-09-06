# Webpack Express Boilerplate

Instlación de dependencias:

    $ npm install

Arrancar backend modo de desarrollo:

    $ npm run start:dev

Arrancar webpack modo build:

    $ npm run webpack:build    

Solucionar problema nodemon ENOSPC

    $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

---

Fuentes:

+ https://github.com/pepeul1191/koa-access-admin
+ https://webpack.js.org/plugins/provide-plugin/
+ https://stackoverflow.com/questions/23305599/webpack-provideplugin-vs-externals
