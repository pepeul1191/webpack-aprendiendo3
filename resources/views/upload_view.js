import Upload from '../libs/upload';

var UploadView = Backbone.View.extend({
  // attributes
  el: '#workspace',
  system_id: null,
  upload: null,
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
		  url: STATIC_URL + 'templates/plugins/upload.html',
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
    this.upload = new Upload({
      el: '#uploadForm',
      inputFile: 'filePicture',
      helpText: 'txtPictureHelp',
      buttonChoose: 'btnSelectPicture',
      buttonUpload: 'btnUploadPicture',
      img: 'imgPicture',
      service: {
        url: BASE_URL + 'district/search',
        formDataKey: 'file',
        uploadMessage: 'Subiendo archivo...',
        errorMessage: 'Ocurrió un error en subir el archivo',
      },
      formatResponseData: {
        id: 'id',
        name: 'name',
      },
      formatModelData: {
        id: 'id',
        name: 'name',
      },
      extensions:{
        allow: ['image/jpeg', 'image/png', 'image/jpg'],
        message: 'Formato no válido',
      },
      size:{
        allow: 60000,
        message: 'Archivo supera el máximo permitido',
      },
    });
  },
  // delegator methods
});

export default UploadView;