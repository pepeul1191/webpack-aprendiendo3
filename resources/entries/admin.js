import '../../public/css/styles.css';
import '../../public/css/preloader.css';
// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';
import HomeRouter from '../routes/home';
import District from '../models/district';
import hideLoader from '../helpers/hide_loader';

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
