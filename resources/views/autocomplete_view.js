import Autocomplete from '../libs/autocomplete';

var AutocompleteView = Backbone.View.extend({
  // attributes
  el: '#workspace',
  system_id: null,
  autocomplete: null,
  // constructor
	initialize: function(){

  },
  // events
	events: {
  },
  // methods
  render: function(){
		var data = {};
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/plugins/autocomplete.html',
		  type: 'GET',
		  async: false,
		  success: function(resource) {
        var template = _.template(resource);
        templateCompiled = template(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				console.log(JSON.parse(xhr.responseText));
      },
		});
		this.$el.html(templateCompiled);
  },
  loadComponents: function(){
    this.autocomplete = new Autocomplete({
      el: '#locationForm',
      inputText: '#txtLocation',
      inputHelp: '#locationHelp',
      hintList: '#locationsList',
      service: {
        url: BASE_URL + 'district/search',
        param: 'name',
      },
    });
  },
  // delegator methods
});

export default AutocompleteView;