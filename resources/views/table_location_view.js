import Table from '../libs/table';
import DepartmentCollection from '../collections/department_collection';
import Department from '../models/department';
import ProvinceCollection from '../collections/province_collection';
import Province from '../models/province';

var TableLocationView = Backbone.View.extend({
  // attributes
  el: '#workspace',
  // tables
  departmentTable: null,
  provinceTable: null,
  districtTable: null,
  // constructor
	initialize: function(){

  },
  // events
	events: {
    // table departmentTable events
    'click #departmentTable > tbody > tr > td > i.delete': 'deleteRowDepartment',
    'click #departmentTable > tbody > tr > td > i.load-provinces': 'loadProvinces',
    'keyup #departmentTable > tbody > tr > td > input.text': 'inputTextEscribirDeparment',
    'click #departmentTable > tfoot > tr > td > button.add-row': 'addRowDepartment',
    'click #departmentTable > tfoot > tr > td > button.save-table': 'saveTableDepartment',
     // table provinceTable events
     'click #provinceTable > tbody > tr > td > i.delete': 'deleteRowProvince',
     'click #provinceTable > tbody > tr > td > i.load-districts': 'loadDistricts',
     'keyup #provinceTable > tbody > tr > td > input.text': 'inputTextEscribirProvince',
     'click #provinceTable > tfoot > tr > td > button.add-row': 'addRowProvince',
     'click #provinceTable > tfoot > tr > td > button.save-table': 'saveTableProvince',
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
      messageLabelId: 'messageTables', // String
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
  // departmentTable methods
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
  loadProvinces: function(event){
    var departmentId = event.target.parentElement.parentElement.firstChild.innerHTML;
    this.provinceTable = new Table({
      el: 'provinceTable', // String
      messageLabelId: 'messageTables', // String
      model: Province, // String
      collection: new ProvinceCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'province/list?department_id=' + departmentId, // String
        save: BASE_URL + 'province/save', // String
      },
      extraData: {
        departmentId: departmentId,
      },
      observer: { // not initialize
        new: [],
        edit: [],
        delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las provincias',
        list501: 'Ocurrió un error en listar las provincias',
        list404: 'Recurso no encontrado - listar provincias',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar provincias',
        save200: 'Provincias actualizadas',
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
            operation: 'load-districts',
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
    this.provinceTable.list();
  },
  // proivnceTable methods
  deleteRowProvince: function(event){
    this.provinceTable.deleteRow(event);
  },
  inputTextEscribirProvince: function(event){
    this.provinceTable.keyUpInputText(event);
  },
  addRowProvince: function(event){
    this.provinceTable.addRow(event);
  },
  saveTableProvince: function(event){
    this.provinceTable.saveTable(event);
  },
  loadDistricts: function(event){
    var departmentId = event.target.parentElement.parentElement.firstChild.innerHTML;
    this.provinceTable = new Table({
      el: 'provinceTable', // String
      messageLabelId: 'messageTables', // String
      model: Province, // String
      collection: new ProvinceCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'province/list?department_id=' + departmentId, // String
        save: BASE_URL + 'province/save', // String
      },
      extraData: null,
      observer: { // not initialize
        new: [],
        edit: [],
        delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las provincias',
        list501: 'Ocurrió un error en listar las provincias',
        list404: 'Recurso no encontrado - listar provincias',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar provincias',
        save200: 'provincias actualizados',
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
            operation: 'load-districts',
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
    this.provinceTable.list();
  },
});

export default TableLocationView;