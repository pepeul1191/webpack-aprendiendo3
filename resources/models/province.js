var Province = Backbone.Model.extend({
  initialize : function() {
    this.id = null;
    this.name = null;
    this.departmentId = null;
  }
});

export default Province;