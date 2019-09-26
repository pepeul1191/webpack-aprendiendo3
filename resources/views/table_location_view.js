import Autocomplete from '../libs/autocomplete';
import DistrictCollection from '../collections/district_collection';
import District from '../models/district';

var TableLocationView = Backbone.View.extend({
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
		  url: STATIC_URL + 'templates/plugins/table_location.html',
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
    
  },
  // delegator methods
});

export default TableLocationView;