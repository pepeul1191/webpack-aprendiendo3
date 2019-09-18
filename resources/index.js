import '../public/css/styles.css';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

var District = Backbone.Model.extend({
  initialize : function() {
    console.log(' nuevo distrito');
    this.name = 'Lima';
  }
});

var x = new District();

// console.log(x);
/**/

alert("ZS");

var router = Backbone.Router.extend({
  initialize: function() {
  },
  routes:{
    '': 'index',
    'user/create': 'userCreate',
    'user/edit/:id' : 'userEdit',
    // others
    '*actions' : 'default',
  },
  index: function(){
    alert('index');    
  },
  userCreate: function(){
    alert('userCreate');
  },
  userEdit: function(id){
    alert('userEdit ' + id);
  },
});

var router = new router();

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