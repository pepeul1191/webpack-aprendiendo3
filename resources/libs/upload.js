var Upload = Backbone.View.extend({
  // attributes
  el: '#byDefine',
  inputFile: null, // # String
  helpText: null,
  buttonChoose: null, // # String
  buttonUpload: null, // # String
  img: null, // # String
  service: {
    url: null, // String
    param: null, // String
  },
  formatResponseData: {
    id: null, // ID
    name: null, // String
  },
  formatModelData: {
    id: null, // ID
    name: null, // String
  },
  id: null,
  name: null,
  // constructor
	initialize: function(params){
    this.el = params.el;
    this.inputFile = params.inputFile;
    this.inputText = params.inputText;
    this.inputHelp = params.inputHelp;
    this.buttonChoose = params.buttonChoose;
    this.buttonUpload = params.buttonUpload;
    this.img = params.img;
    this.service = params.service;
    this.formatResponseData = params.formatResponseData;
    this.formatModelData = params.formatModelData;
    // dynamic allocation of events
    this.events = this.events || {};
    this.events['click ' + this.buttonChoose] = 'choose';
    this.events['click ' + this.buttonUpload] = 'upload';
    this.delegateEvents();
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  choose: function(event) {
    $(this.inputFile).click();
  },
});

export default Upload;