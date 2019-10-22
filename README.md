# Webpack Express Boilerplate

### Migraciones

Migraciones con DBMATE - accesos:

    $ dbmate -d "db/migrations" -e "DB" new <<nombre_de_migracion>>
    $ dbmate -d "db/migrations" -e "DB" up
    $ dbmate -d "db/migrations" -e "DB" new <<nombre_de_migracion>>
    $ dbmate -d "db/migrations" -e "DB" up
    $ dbmate -d "db/migrations" -e "DB" rollback

### Dump y Restore Mysql

    $ mysqldump -u root -p demo > db/demo.sql
    $ mysql -u root -p demo < db/demo.sql

Query para profes y carreras:

```sql
SELECT T.id AS id, T.name AS name, (CASE WHEN (P.exist = 1) THEN 1 ELSE 0 END) AS exist FROM
(
  SELECT id, name, 0 AS exist FROM carrers
) T 
LEFT JOIN 
(
  SELECT C.id, C.name, 1 AS exist FROM 
  carrers C INNER JOIN teachers_carrers TC ON
  C.id = TC.carrer_id
  WHERE TC.teacher_id = {teacher_id}
) P 
ON P.id = T.id
```

### Ejecución de la Aplciación

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

Backbone router no hash:

    https://www.youtube.com/watch?v=cIq6Z_Vv4nY

Megamenu:

    https://www.youtube.com/watch?v=mPLIIUcjpCA

Menu transparente Materialize

    https://www.youtube.com/watch?v=aqx6WLdIpJk&t=18

Sidemenu:

    https://www.youtube.com/watch?v=AhioxFWkYRg

---

Fuentes:

+ https://github.com/pepeul1191/koa-access-admin
+ https://github.com/pepeul1191/webpack-aprendiendo2
+ https://webpack.js.org/plugins/provide-plugin/
+ https://stackoverflow.com/questions/23305599/webpack-provideplugin-vs-externals
+ https://stackoverflow.com/questions/49652900/how-to-properly-split-common-dependencies-with-webpack4
+ https://webpack.js.org/configuration/mode/
+ https://chriscourses.com/blog/loading-fonts-webpack
+ https://www.youtube.com/watch?v=cIq6Z_Vv4nY
+ https://ejs.co/
+ https://github.com/webpack-contrib/copy-webpack-plugin
+ https://stackoverflow.com/questions/11671400/navigate-route-with-querystring
+ https://stackoverflow.com/questions/42202824/how-to-get-url-parameters-in-backbone
+ https://www.w3docs.com/learn-html/html-menu-tag.html
+ https://evilnapsis.com/2018/06/22/crear-un-carousel-o-slider-de-imagenes-con-materialize-css/
+ https://stackoverflow.com/questions/10422105/add-text-above-html5-video
+ https://stackoverflow.com/questions/53971268/node-sequelize-find-where-like-wildcard
+ https://stackoverflow.com/questions/43729254/sequelize-limit-and-offset-incorrect-placement-in-query
+ https://getbootstrap.com/docs/4.0/getting-started/webpack/
+ https://getbootstrap.com/docs/3.3/javascript/#dropdowns
+ https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
+ https://stackoverflow.com/questions/13953080/how-to-access-router-globally-in-backbone-js
+ https://openlayers.org/en/latest/apidoc
+ https://openstreetmap.be/en/projects/howto/openlayers.html
+ https://gis.stackexchange.com/questions/274803/adding-markers-using-openlayers-4