import Table from '../libs/table';
import CarrerCollection from '../collections/carrer_collection';
import Carrer from '../models/carrer';

var TableTeacherCarrerView = Backbone.View.extend({
  // attributes
  el: '#modal',
  // tables
  teacherCarrerTable: null,
  teacherId: null,
  // constructor
	initialize: function(){

  },
  // events
	events: {
  },
  // methods
  render: function(){
		var data = {
      title: 'Gestión de Carreras del Profesor',
    };
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/plugins/modal_table_teacher_carrer.html',
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
    // load modal
    $(this.el).modal('show');
    $(this.el).on('hidden.bs.modal', function () {
      Backbone.history.navigate('/table/teachers', true);
      return false; 
    });
  },
  loadComponents: function(){
    var _this = this;
    this.teacherCarrerTable = new Table({
      el: 'teacherCarrerTable', // String
      messageLabelId: 'messageTables', // String
      model: Carrer, // String
      collection: new CarrerCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'teacher/' + _this.teacherId + '/carrers', // String
        save: BASE_URL + 'teacher/carrer/save', // String
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
            type: 'td',
            styles: '', 
            edit: true,
            key: 'name',
          },
          
        ],
        buttons: [
        ],
      },
    });
    this.teacherCarrerTable.list();
  },
});

export default TableTeacherCarrerView;