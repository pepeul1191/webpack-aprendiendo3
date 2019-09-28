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
    // table departmentTable events
    'click #departmentTable > tbody > tr > td > i.delete': 'deleteRowDepartment',
    'keyup #departmentTable > tbody > tr > td > input.text': 'inputTextEscribirDeparment',
    'click #departmentTable > tfoot > tr > td > button.add-row': 'addRowDepartment',
    'click #departmentTable > tfoot > tr > td > button.save-table': 'saveTableDepartment',
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
      el: 'departmentTable', // String
      messageLabelId: 'mensajeRptaDepartment', // String
      model: Department, // String
      collection: new DepartmentCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'department/list', // String
        save: BASE_URL + 'department/save', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar los departamentos',
        list501: 'Ocurrió un error en listar los departamentos',
        list404: 'Recurso no encontrado - listar departamentos',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar departamentos',
        save200: 'Departamentos actualizados',
      },
      serverKeys: ['id', 'name'],
      row: {
        table: ['id', 'name'],
        tds: [
          { // id
            type: 'tdId',
            styles: 'display: none; ', 
            edit: false,
            key: 'id',
          },
          { // namne
            type: 'input[text]',
            styles: '', 
            edit: true,
            key: 'name',
          },
        ],
        buttons: [
          {
            type: 'i',
            operation: 'load-provinces',
            class: 'fa-chevron-right',
            styles: 'padding-left: 25px;',
          },
          {
            type: 'i',
            operation: 'delete',
            class: 'fa-times',
            styles: 'padding-left: 15px;',
          },
        ],
      },
    });
    this.departmentTable.list();
  },
  // delegator methods
  deleteRowDepartment: function(event){
    this.departmentTable.deleteRow(event);
  },
  inputTextEscribirDeparment: function(event){
    this.departmentTable.keyUpInputText(event);
  },
  addRowDepartment: function(event){
    this.departmentTable.addRow(event);
  },
  saveTableDepartment: function(event){
    this.departmentTable.saveTable(event);
  },
});

export default TableLocationView;