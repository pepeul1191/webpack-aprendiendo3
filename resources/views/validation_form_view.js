import ValidationForm from '../libs/validation_form';

var checkCarrerName = (carrerName) => {
  console.log(carrerName);
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
        // 1
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
        // 2
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
        // 3
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
              customFunction: checkCarrerName('txtCarrer'),
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