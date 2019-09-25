var ValidationForm = Backbone.View.extend({
  // attributes
  el: '#byDefine',
  entries: [/*
    {
      id: 'txtUser',
      help: 'txtUserHelp',
      validations: [
        {
          type: 'notNull',
          message: 'Debe de ingresar un nombre de usuario',
        }, 
      ],
    },
  */],
  classes: {
    textError: null,
    borderError: null,
  },
  messageForm: null,
  result: false,
  isOk: true,
  // constructor
  initialize: function(params){
    this.el = params.el;
    this.entries = params.entries;
    this.classes = params.classes;
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  check: function(event) {
    this.entries.forEach(function(entry) {
      entry.validations.forEach(function(validation){
        
        eval('this.' + validation.type + '()');
      });
    });
  },
  notEmpty: function(){
    alert('notEmpty');
  },
});

export default ValidationForm;