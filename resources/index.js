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

console.log(x);
/**/

alert("ZS");

$(document).ready(function() {
  alert("document ready occurred!");
});