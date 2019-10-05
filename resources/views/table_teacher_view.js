import Table from '../libs/table';
import TeacherCollection from '../collections/teacher_collection';
import Teacher from '../models/teacher';

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
      serverKeys: ['id', 'names', 'url'],
      row: {
        table: ['id', 'names', 'url'],
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
            key: 'names',
          },
        ],
        buttons: [

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
        step: 10,
        page: 1,
      },
    });
    this.teacherTable.list();
  },
});

export default TableTeacherView;