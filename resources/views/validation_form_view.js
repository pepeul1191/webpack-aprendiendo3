import ValidationForm from '../libs/validation_form';

var checkCarrerName = function() {
  var resp = true;
  var carrerName = $('#txtCarrer').val();
  $.ajax({
    type: 'GET',
    url: BASE_URL + 'carrer/name/count',
    data: { 
      name: carrerName,
    },
    headers: {
      [CSRF_KEY]: CSRF,
    },
    async: false,
    success: function(data){
      if(parseInt(data) > 0){
        resp = false;
      }
    },
    error: function(xhr, status, error){
      console.error(error);
      console.log(JSON.parse(xhr.responseText));
    }
  });
  return resp;
}; 

var ValidationFormView = Backbone.View.extend({
  // attributes
  el: '#workspace',
  form: null,
  btnId: 'btnSave',
  // constructor
	initialize: function(){

  },
  // events
	events: {
    'click #btnSave': 'save',
  },
  // methods
  render: function(){
		var data = {};
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/plugins/validation_form.html',
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
    this.form = new ValidationForm({
      el: '#form',
      entries: [
        // user
        {
          id: 'txtUser',
          help: 'txtUserHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar un nombre de usuario',
            }, 
          ],
        },
        // email
        {
          id: 'txtEmail',
          help: 'txtEmailHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar su correo',
            }, 
            {
              type: 'isEmail',
              message: 'Debe de ingresar un correo válido',
            }, 
          ],
        },
        // carrer
        {
          id: 'txtCarrer',
          help: 'txtCarrerHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar una carrera',
            }, 
            {
              type: 'customFunction',
              message: 'Carrera repetida',
              customFunction: checkCarrerName,
            },
          ],
        },
        // carrer select
        {
          id: 'slcCarrer',
          help: 'slcCarrerHelp',
          validations: [
            {
              type: 'isSelected',
              message: 'Debe de seleccionar una carrera',
            }, 
          ],
        },
      ],
      classes: {
        textDanger: 'text-danger',
        inputInvalid: 'is-invalid',
        textSuccess: 'text-success',
      },
      messageForm: 'messageForm',
    });
  },
  save: function(event){
    this.form.check();
    if(this.form.isOk == true){
      alert('=)');
    }
  },
  // delegator methods
});

export default ValidationFormView;