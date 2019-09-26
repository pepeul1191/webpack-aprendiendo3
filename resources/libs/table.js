var Table = Backbone.View.extend({
  // attributes
  el: 'byDefine',
  messageLabelId: null, // String
  model: null, // String
  collection: null, // Backbone collection
  services: {
    list: null, // String
    save: null, // String
  },
  extraData: null,
  observer: { // not initialize
    new: [],
    edit: [],
    delete: [],
  },
  messages: {
    listError: '',
    saveError: '',
    otherError: '',
    saveOk: '',
  },
  rowKeys: {
    server: [],
    table: [],
    html: [],
  },
  // constructor
	initialize: function(params){
    this.el = params.el;
    this.idTable = params.idTable;
    this.messageLabelId = params.messageLabelId;
    this.model = params.model;
    this.collection = params.collection;
    this.services = params.services;
    this.extraData = params.extraData;
    this.messages = params.messages;
    this.rowKeys = params.rowKeys;
    // dynamic allocation of events
    this.events = this.events || {};
    this.delegateEvents();
    // init the observer for changes
    // this.listenTo(this.collection, "change", this.onChange, this);
  },
  // events
  events: {
    'click .hint': 'hintClick',
  },
  // methods
  list: function(event) {
    //this.collection.reset();
    var _this = this;
    $.ajax({
      url: _this.services.list,
      type: 'GET',
      data: {
        // [_this.service.param]: text,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data) {
        var list = JSON.parse(data);
        for(var i = 0; i < list.length; i++){
          var model = new _this.model();
          for(var k = 0; k < _this.rowKeys.server.length; k++){
            var serverKey = _this.rowKeys.server[k];
            var tableKey = _this.rowKeys.table[k];
            // create model
            model.set({
              [tableKey]: list[i][serverKey]
            });
            // draw html
          }
          // add model to collection
          _this.collection.add(model);
        }
        console.log(_this.collection.toJSON());
      },
      error: function(xhr, status, error){
        console.error(error);
        console.log(JSON.parse(xhr.responseText));
      }
    });
    console.log('1 ++++++++++++++++++++++++');
  },
});

export default Table;