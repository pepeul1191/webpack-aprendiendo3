var UserEditView = Backbone.View.extend({
  el: '#workspace',
  system_id: null,
	initialize: function(){
	},
	events: {
  },
  render: function(id){
		var data = { 
      id: id,
    };
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/user/edit.html',
		  type: 'GET',
		  async: false,
		  success: function(resource) {
        var template = _.template(resource);
        templateCompiled = template(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				console.log(JSON.parse(xhr.responseText));
      }
		});
		this.$el.html(templateCompiled);
	},
});

export default UserEditView;