import Table from '../libs/table';
import DepartmentCollection from '../collections/department_collection';
import Department from '../models/department';

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
    this.departmentTable = new Table({
      el: null, // String
      messageLabelId: null, // String
      model: Department, // String
      collection: new DepartmentCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'department/list', // String
        save: null, // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        listError: '',
        saveError: '',
        otherError: '',
        saveOk: '',
      },
      rowKeys: {
        server: ['id', 'name'],
        table: ['id', 'name'],
        html: [
          
        ],
      },
    });
    this.departmentTable.list();
  },
  // delegator methods
});

export default TableLocationView;