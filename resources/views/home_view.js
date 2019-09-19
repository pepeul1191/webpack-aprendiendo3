var HomeView = Backbone.View.extend({
  el: '#workspace',
  system_id: null,
	initialize: function(){
	},
	events: {
  },
  render: function(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
		var data = { 
      message: dateTime,
    };
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/home/index.html',
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

export default HomeView;