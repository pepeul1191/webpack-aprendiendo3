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
    this.serverKeys = params.serverKeys;
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
        var tbody = document.createElement('TBODY');
        for(var i = 0; i < list.length; i++){
          // create model 
          var model = new _this.model();
          // create row
          var tr = document.createElement('TR');
          // itarete list
          for(var k = 0; k < _this.serverKeys.length; k++){
            var serverKey = _this.serverKeys[k];
            var tableKey = _this.rowKeys.table[k];
            // set model
            model.set({
              [tableKey]: list[i][serverKey]
            });
            // draw html
            var td = _this.helper()[_this.rowKeys.tds[k].type](
              _this.rowKeys.tds[k], // params for td (styles, edit, etc)
              list[i][serverKey], // value for td
              _this, // view instance ????
            ); 
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
          // add model to collection
          _this.collection.add(model);
        }
        // console.log(_this.collection.toJSON());
        // append tbody to table
        document.getElementById(_this.el).appendChild(tbody);
      },
      error: function(xhr, status, error){
        console.error(error);
        console.log(JSON.parse(xhr.responseText));
      }
    });
  },
  helper: function(){
    return {
      'td': function(params, value){
				//console.log('td');
        var td = document.createElement('TD');
        td.setAttribute('style', params.styles);
        td.innerHTML = value;
        //console.log(td);
				return td;
      },
      'input[text]': function(params, value){
				//console.log('input[text]');
        var td = document.createElement('TD');
        var inputText = document.createElement('INPUT');
        inputText.type = "text";
        inputText.setAttribute('style', params.styles);
        inputText.classList.add('text');
        inputText.value = value;
        td.appendChild(inputText);
				return td;
      },
    };
  },
});

export default Table;