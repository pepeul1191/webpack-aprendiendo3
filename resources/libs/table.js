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
  row: {
    server: [],
    table: [],
    html: [],
  },
  buttons: [],
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
    this.row = params.row;
    // dynamic allocation of events
    this.events = this.events || {};
    this.delegateEvents();
    // init the observer for changes
    // this.listenTo(this.collection, "change", this.onChange, this);
  },
  // events
  events: {
    'click i.delete': 'deleteRow',
    'keyup input.text': 'keyUpInputText',
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
            var tableKey = _this.row.table[k];
            // set model
            model.set({
              [tableKey]: list[i][serverKey]
            });
            // draw html
            var td = _this.helper()[_this.row.tds[k].type](
              _this.row.tds[k], // params for td (styles, edit, etc)
              list[i][serverKey], // value for td
              _this, // view instance ????
            ); 
            // appendo to row
            tr.appendChild(td);
          }
          // buttons
          var tdButtons = document.createElement('TD');
          for(var j = 0; j < _this.row.buttons.length; j++){
            var button = _this.helper()[_this.row.buttons[j].type](
              _this.row.buttons[j], // params for td (styles, edit, etc)
              _this, // view instance ????
            );
            tdButtons.appendChild(button);
          }
          tr.appendChild(tdButtons);
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
        inputText.type = 'text';
        inputText.setAttribute('style', params.styles);
        inputText.setAttribute('key', params.key);
        inputText.classList.add('text');
        inputText.value = value;
        td.appendChild(inputText);
				return td;
      },
      'i': function(params){
        // de font-awesome 4
        // <i class="fa fa-chevron-left" aria-hidden="true"></i>
        var i = document.createElement('I');
        i.classList.add('fa');
        i.classList.add(params.class);
        i.setAttribute('style', params.styles);
        // add operation as class for view events
        i.classList.add(params.operation);
				return i;
      },
    };
  },
  deleteRow: function(event){
    // get model
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var model = this.collection.get(rowId);    
    // if the model to be edited already exists as new or edited, remove from observer and add as deleted in observer
    // TODOOOO
    // remove from collection
    this.collection.remove(model);
    // delete from DOM
    var tbody = event.target.parentElement.parentElement.parentElement;
    var td = event.target.parentElement.parentElement;
    tbody.removeChild(td);
  }, 
  keyUpInputText: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
		var inputValue = event.target.value;
    var key = event.target.getAttribute('key');
		var model = this.collection.get(rowId);
		//console.log("inputTextEscribir");
		model.set(key, inputValue);
  },
});

export default Table;