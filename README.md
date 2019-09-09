# Webpack Express Boilerplate

Instlación de dependencias:

    $ npm install

Arrancar backend modo de desarrollo:

    $ npm run start:dev

Arrancar webpack modo producción:

    $ npm run webpack:build   

Arrancar webpack modo desarrollo:

    $ npm run webpack:dev

Solucionar problema nodemon ENOSPC

    $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

---

Fuentes:

+ https://github.com/pepeul1191/koa-access-admin
+ https://github.com/pepeul1191/webpack-aprendiendo2
+ https://webpack.js.org/plugins/provide-plugin/
+ https://stackoverflow.com/questions/23305599/webpack-provideplugin-vs-externals
+ https://stackoverflow.com/questions/49652900/how-to-properly-split-common-dependencies-with-webpack4
+ https://webpack.js.org/configuration/mode/
+ https://chriscourses.com/blog/loading-fonts-webpack
