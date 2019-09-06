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