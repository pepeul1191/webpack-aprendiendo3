var Image = Backbone.Model.extend({
  initialize : function() {
    this.id = null;
    this.name = null;
    this.url = null;
  }
});

export default Image;