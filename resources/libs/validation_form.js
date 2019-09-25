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
    textSuccess: null,
    inputInvalid: null,
  },
  messageForm: null,
  result: false,
  isOk: true,
  // constructor
  initialize: function(params){
    this.el = params.el;
    this.entries = params.entries;
    this.classes = params.classes;
    this.messageForm = params.messageForm;
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  check: function(event) {
    var _this = this;
    // define isOk
    this.entries.forEach(function(entry) {
      entry.validations.forEach(function(validation){
        try {
          var isOk = _this[validation.type](entry, validation);
          if(entry.isOk != false || isOk == true){
            entry.isOk = isOk;
          }
        } catch (e) {
          if (e instanceof TypeError){
            _this.isOk = false;
            $('#' +_this.messageForm).addClass(_this.classes.textError);
            $('#' +_this.messageForm).removeClass(_this.classes.textWarning);
            $('#' +_this.messageForm).removeClass(_this.classes.textSuccess);
            $('#' +_this.messageForm).html('Validación no existente');
          }
        }
      });
    });
    // check if isOk == true
    var _this = this;
    _this.isOk = true;
    this.entries.forEach(function(entry){
      if(entry.isOk == false){
        _this.isOk = false;
      }
    });
  },
  // validation methods
  notEmpty: function(entry, validation){
    var isOk = false;
    if($('#' + entry.id).val() == ''){
      $('#' + entry.help).html(validation.message);
      $('#' + entry.help).removeClass(this.classes.textSuccess);
      $('#' + entry.help).removeClass(this.classes.textWarning);
      $('#' + entry.help).addClass(this.classes.textDanger);
      $('#' + entry.id).addClass(this.classes.inputInvalid);
    }else{
      $('#' + entry.help).html('');
      $('#' + entry.help).removeClass(this.classes.textDanger);
      $('#' + entry.id).removeClass(this.classes.inputInvalid);
      isOk = true;
    }
    return isOk;
  },
});

export default ValidationForm;