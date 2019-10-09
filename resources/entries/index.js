import '../../public/css/styles.css';
// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';
import HomeRouter from '../routes/home';
import District from '../models/district';

var x = new District();

var router = new HomeRouter();

$(document).ready(function(){
  // alert("document ready occurred!");
  Backbone.history.start({
    pushState: true, 
    root: '/',
  });
});

$('body').on("click", 'a[href^="/"]', function(evt) {
  evt.preventDefault();
  router.navigate($(this).attr('href'), {trigger: true});
});