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
      inputFile: '#filePicture',
      inputHelp: '#txtPictureHelp',
      buttonChoose: '#btnSelectPicture',
      buttonUpload: '#btnUploadPicture',
      img: '#imgPicture',
      service: {
        url: BASE_URL + 'district/search',
        param: 'name',
      },
      formatResponseData: {
        id: 'id',
        name: 'name',
      },
      formatModelData: {
        id: 'id',
        name: 'name',
      },
    });
  },
  // delegator methods
});

export default UploadView;