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
  buttons: [
    {
      type: null, // i, href
      operation: null,
      class: null,
      styles: null,
    },
  ],
  // constructor
	initialize: function(params){
    this.el = params.el;
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
    this.listenTo(this.collection, 'change', this.changeObserver, this);
  },
  // events
  events: {
    // table buttons
    'click button.add-row': 'addRow',
    // row buttons
    'click i.delete': 'deleteRow',
    // table inputs
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
      'tdId': function(params, value){
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
  addRow: function(event){
    // init new model
    var model = new this.model();
    // create row
    var tr = document.createElement('TR');
    // itarete list
    for(var k = 0; k < this.serverKeys.length; k++){
      var tableKey = this.row.table[k];
      // set model
      var randomId = this.el + _.random(0, 1000);
      if(tableKey == 'id'){
        model.set({
          id: randomId,
        });
      }else{
        model.set({
          [tableKey]: null
        });
      }
      // draw html
      var td = null;
      if(this.row.tds[k].type == 'tdId'){
        td = this.helper()[this.row.tds[k].type](
          this.row.tds[k], // params for td (styles, edit, etc)
          randomId, // value for td
          this, // view instance ????
        ); 
      }else{
        td = this.helper()[this.row.tds[k].type](
          this.row.tds[k], // params for td (styles, edit, etc)
          null, // value for td
          this, // view instance ????
        ); 
      }
      // appendo to row
      tr.appendChild(td);
    }
    // buttons
    var tdButtons = document.createElement('TD');
    for(var j = 0; j < this.row.buttons.length; j++){
      var button = this.helper()[this.row.buttons[j].type](
        this.row.buttons[j], // params for td (styles, edit, etc)
        this, // view instance ????
      );
      tdButtons.appendChild(button);
    }
    tr.appendChild(tdButtons);
    // add model to collection
    this.collection.add(model);
    // append to tbody or create tbody and append if tbody does not exist
    var children = document.querySelectorAll('#' + this.el + ' > *');
		var tbody = null;
		for(var i = 0; i < children.length; i++){
		  if(children[i].nodeName == 'TBODY'){
		  	tbody = children[i];
		  }
		}
		if(tbody == null){
		  tbody = document.createElement('TBODY');
		  tbody.appendChild(tr);
		  document.getElementById(this.el).appendChild(tbody);
		}else{
		  tbody.appendChild(tr);
		}
  },
  deleteRow: function(event){
    // get model
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var model = this.collection.get(rowId);    
    // if the model to be edited already exists as new or edited, remove from observer and add as deleted in observer
    if(_.contains(this.observer.new, (rowId + ''))){
			this.observer.new = _.without(this.observer.new, (rowId + ''));
		}
		if(_.contains(this.observer.edit, (rowId + ''))){
			this.observer.edit = _.without(this.observer.edit, (rowId + ''));
		}
		if(!_.contains(this.observer.delete, (rowId + ''))){
			this.observer.delete.push(rowId + '');
    }
    // console.log(this.observer);
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
  changeObserver: function(modelChanged) {
		if(modelChanged != null){
			var rowId = modelChanged.get('id') + '';
			if(rowId.indexOf(this.el) >= 0){
				if(!_.contains(this.observer.new, rowId)){
					this.observer.new.push(rowId);
				}
			}else{
				if(!_.contains(this.observer.edit, rowId)){
					this.observer.edit.push(rowId);
				}
			}
			// console.log(this.observer);
		}
  },
});

export default Table;