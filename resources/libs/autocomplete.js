var Autocomplete = Backbone.View.extend({
  // attributes
  el: '#byDefine',
  inputText: null,
  inputHelp: null,
  hintList: null,
  service: {
    url: null,
    param: null,
  },
  // constructor
	initialize: function(params){
    this.el = params.el;
    this.service = params.service;
    this.inputText = params.inputText;
    this.inputHelp = params.inputHelp;
    this.hintList = params.hintList;
    // dynamic allocation of events
    this.events = this.events || {};
    this.events['keyup ' + this.inputText] = 'search';
		this.events['focusout ' + this.inputText] = 'clean';
    this.delegateEvents();
  },
  // events
  events: {
  },
  // methods
  search: function(event) {
    var text = $(event.target).val();
    var _this = this;
    $.ajax({
		  url: _this.service.url,
      type: 'GET',
      data: {
        [_this.service.param]: text,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
		  async: false,
		  success: function(data) {
        
      },
      error: function(xhr, status, error){
        console.error(error);
				console.log(JSON.parse(xhr.responseText));
      }
		});
  },
  clean: function(event) {
    console.log('clean');
  },
});

export default Autocomplete;