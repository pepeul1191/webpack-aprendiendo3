import Table from '../libs/table';
import ImageCollection from '../collections/image_collection';
import Image from '../models/image';

var TableImageView = Backbone.View.extend({
  // attributes
  el: '#workspace',
  // tables
  imageTable: null,
  // constructor
	initialize: function(){

  },
  // events
	events: {
    'click #imageTable > tbody > tr > td > i.file-select': 'imageFileSelect',
    'click #imageTable > tbody > tr > td > i.file-upload': 'imageFileUpload',
    'click #imageTable > tbody > tr > td > i.file-view': 'imageFileView',
    'click #imageTable > tfoot > tr > td > button.save-table': 'saveTableImage',
    'keyup #imageTable > tbody > tr > td > input.text': 'inputTextImage',
    'click #imageTable > tfoot > tr > td > button.add-row': 'addRowImage',
  },
  // methods
  render: function(){
		var data = {};
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/plugins/table_image.html',
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
    this.imageTable = new Table({
      el: 'imageTable', // String
      messageLabelId: 'message', // String
      model: Image, // String
      collection: new ImageCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'image/list', // String
        save: BASE_URL + 'image/save', // String
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
      serverKeys: ['id', 'name', 'url'],
      row: {
        table: ['id', 'name', 'url'],
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
            operation: 'file-select',
            class: 'fa-search',
            styles: 'padding-left: 15px;',
          },
          {
            type: 'i',
            operation: 'file-upload',
            class: 'fa-cloud-upload',
            styles: 'padding-left: 15px;',
          },
          {
            type: 'i',
            operation: 'file-view',
            class: 'fa-picture-o',
            styles: 'padding-left: 15px;',
          },
        ],
      },
      upload: {
        path: null,
        inputFile: 'fileImage', // String
        service: {
          url: BASE_URL + 'upload/file',
          formDataKey: 'file',
          uploadMessage: 'Subiendo archivo...',
          errorMessage: 'Ocurrió un error en subir el archivo',
          successMessage: 'Carga completada'
        },
        keyModel: 'url',
        extensions: {
          allow: ['image/jpeg', 'image/png'],
          message: 'Archivo no es de la extensión permitida',
        },
        size: {
          allow: 500000, // bytes
          message: 'Archivo supera el máximo permitido (0.5MB)',
        },
      }
    });
    this.imageTable.list();
  },
  imageFileSelect: function(event){
    this.imageTable.fileSelect(event);
  },
  imageFileUpload: function(event){
    this.imageTable.fileUpload(event);
  },
  saveTableImage: function(event){
    this.imageTable.saveTable(event);
  },
  inputTextImage: function(event){
    this.imageTable.keyUpInputText(event);
  },
  imageFileView: function(event){
    this.imageTable.imageFileView(event);
  },
  addRowImage: function(event){
    this.imageTable.addRow(event);
  },
});

export default TableImageView;