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

$(document).ready(function(){
  // alert("document ready occurred!");
  new router();
  Backbone.history.start();
});