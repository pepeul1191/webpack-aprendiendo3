import Table from '../libs/table';
import TeacherCollection from '../collections/teacher_collection';
import Teacher from '../models/teacher';
import SexCollection from '../collections/sex_collection';
import Sex from '../models/sex';

var TableTeacherView = Backbone.View.extend({
  // attributes
  el: '#workspace',
  // tables
  teacherTable: null,
  // constructor
	initialize: function(){

  },
  // events
	events: {
    // pagination
    'click #teacherTable > tfoot > tr > td > #btnGoBegin': 'goBegin',
    'click #teacherTable > tfoot > tr > td > #btnGoPrevious': 'goPrevious',
    'click #teacherTable > tfoot > tr > td > #btnGoNext': 'goNext',
    'click #teacherTable > tfoot > tr > td > #btnGoLast': 'goLast',
    // autcomplete
    'click #teacherTable > tfoot > tr > td > #btnGoLast': 'goLast',
    'keyup #teacherTable > tbody > tr > td > input.text-autocomplete': 'autocompleteDistrict',
    'click #teacherTable > tbody > tr > td > .hint-container': 'clickHint',
    // save
    'click #teacherTable > tfoot > tr > td > button.add-row': 'addRow',
    'click #teacherTable > tfoot > tr > td > button.save-table': 'saveTable',
    'keyup #teacherTable > tbody > tr > td > input.text': 'inputText',
    'click #teacherTable > tbody > tr > td > i.delete': 'deleteRow',
    "change #teacherTable > tbody > tr > td > select": 'changeSex',
  },
  // methods
  render: function(){
		var data = {};
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/plugins/table_teacher.html',
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
    // fill collection for select
    var sexCollection = new SexCollection();
    sexCollection.fill();
    // call table
    this.teacherTable = new Table({
      el: 'teacherTable', // String
      messageLabelId: 'message', // String
      model: Teacher, // String
      collection: new TeacherCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'teacher/list', // String
        save: BASE_URL + 'teacher/save', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las imágenes',
        list501: 'Ocurrió un error en listar las imágenes',
        list404: 'Recurso no encontrado - listar imágenes',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar imágenes',
        save200: 'Imágenes actualizados',
      },
      serverKeys: ['id', 'names', 'last_names', 'district_id', 'sex_id', ],
      row: {
        table: ['id', 'names', 'last_names', 'district_id', 'sex_id', ],
        tds: [
          { // id
            type: 'tdId',
            styles: 'display: none; ', 
            edit: false,
            key: 'id',
          },
          { // names
            type: 'input[text]',
            styles: '', 
            edit: true,
            key: 'names',
          },
          { // last_names
            type: 'input[text]',
            styles: '', 
            edit: true,
            key: 'last_names',
          },
          { // districts
            type: 'autocomplete',
            styles: '', 
            edit: true,
            key: 'district',
            service: {
              url: BASE_URL + 'district/search',
              param: 'name',
            },
            formatResponseData: {
              id: 'id',
              name: 'name',
            },
            keyModel: 'district_id',
            keyName: 'district_name',
          },
          { // sex
            type: 'select',
            styles: 'width: 100px;', 
            edit: true,
            key: 'sex_id',
            service: {
              url: BASE_URL + 'sex/list',
              param: '',
            },
            formatResponseData: {
              id: 'id',
              name: 'name',
            },
            keyModel: 'id',
            keyName: 'name',
            collection: sexCollection,
            model: Sex,
          },
        ],
        buttons: [
          {
            type: 'i',
            operation: 'delete',
            class: 'fa-times',
            styles: 'padding-left: 30px;',
          },
        ],
      },
      pagination: {
        buttons: {
          next: 'btnGoNext',
          prev: 'btnGoPrevious',
          begin: 'btnGoBegin',
          last: 'btnGoLast',
        },
        service: {
          paramPage: 'page',
          paramStep: 'step',
          respList: 'list',
          respPages: 'pages',
        },
        number: 'pagination',
        step: 20,
        pageActual: 1,
        pageNumber: null,
      },
    });
    this.teacherTable.list();
  },
  // pagination
  goBegin: function(event){
    this.teacherTable.goBegin();
  },
  goPrevious: function(event){
    this.teacherTable.goPrevious();
  },
  goNext: function(event){
    this.teacherTable.goNext();
  },
  goLast: function(event){
    this.teacherTable.goLast();
  },
  // autcomplete
  autocompleteDistrict: function(event){
    this.teacherTable.keyUpAutocomplete(event);
  },
  clickHint: function(event){
    this.teacherTable.clickHint(event);
  },
  // table
  saveTable: function(event){
    this.teacherTable.saveTable(event);
  },
  addRow: function(event){
    this.teacherTable.addRow(event);
  },
  deleteRow: function(event){
    this.teacherTable.deleteRow(event);
  },
  inputText: function(event){
    this.teacherTable.keyUpInputText(event);
  },
  deleteRow: function(event){
    this.teacherTable.deleteRow(event);
  },
  changeSex: function(event){
    this.teacherTable.changeSelect(event);
  },
});

export default TableTeacherView;