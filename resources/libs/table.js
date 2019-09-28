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
    list500: null,
    list404: null,
    save500: null,
    save501: null,
    save404: null,
    save200: null,
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
        // clean collection, observer and DOM
        var table = document.getElementById(_this.el);
        var childs = table.childNodes;
        for (var i = 0; i < childs.length; i++) {
          if(childs[i].nodeName == "TBODY"){
            table.removeChild(childs[i]);
          }
        }
        _this.collection.reset();
        _this.observer = { // not initialize
          new: [],
          edit: [],
          delete: [],
        };
        // get list from server
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
        if(xhr.status == 404){
          $('#' + _this.messageLabelId).removeClass('alert-success');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-danger');
          $('#' + _this.messageLabelId).html(_this.messages.list404);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        }else if(xhr.status == 501){
          $('#' + _this.messageLabelId).removeClass('alert-success');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-danger');
          $('#' + _this.messageLabelId).html(_this.messages.list501);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        }else{
          $('#' + _this.messageLabelId).removeClass('alert-success');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-danger');
          $('#' + _this.messageLabelId).html(_this.messages.list500);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        }
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
  saveTable: function(event){
    var dataToSend = {
      new: [],
      edit: [],
      delete: [],
      extra: {},
    };
    // check if observer hava changes
    var procced = true;
    if(
      this.observer.new.length == 0 && 
      this.observer.edit.length == 0 && 
      this.observer.delete.length == 0
    ){
			$('#' + this.messageLabelId).removeClass('alert-danger');
      $('#' + this.messageLabelId).removeClass('alert-success');
      $('#' + this.messageLabelId).addClass('alert-warning');
      $('#' + this.messageLabelId).html('No se ha ejecutado cambios en la tabla');
      $('html, body').animate({ scrollTop: $("#" + this.messageLabelId).offset().top }, 1000);
      procced = false;
    }
    if(procced){
      // push models to dataToSend from observer's keys
      for (var key in this.observer) {
				for (var i = 0; i < this.observer[key].length; i++) {
					var observerId = this.observer[key][i];
					if(key == 'new' || key == 'edit'){
						var model = this.collection.get(observerId);
						dataToSend[key].push(model.toJSON());
					}else{
						dataToSend['delete'].push(observerId);
					}
				}
      }
      // console.log(dataToSend);
      // add extra data to dataToSend
      if(this.extraData != null){
				dataToSend.extra = this.extraData;
      }
      // send data to server
      var _this = this;
      $.ajax({
        url: _this.services.save,
        type: 'POST',
        data: {
          data: JSON.stringify(dataToSend)
        },
        headers: {
          [CSRF_KEY]: CSRF,
        },
        async: false,
        success: function(data) {
          // replace new ids in models and DOM
          var idNews = JSON.parse(data);
          if(idNews != []){
            for(var p = 0; p < idNews.length; p++){
              var temp = idNews[p];
              var tempId = temp.tempId;
              var newId = temp.newId;
              //actualizar id en collection
              var model = _this.collection.get(tempId);
              model.set({'id': newId});
              //actualizar id en DOM de la tabla
              var trs = document.getElementById(_this.el).lastChild.querySelectorAll('tr');
              for (var i = 0; i < trs.length; i++) {
                if(trs[i].firstChild.innerHTML == tempId){
                  trs[i].firstChild.innerHTML = newId;
                }
              }
            }
          }
          //reset observer
          _this.observer = {
            new: [],
            edit: [],
            delete: [],
          };
          // show message
          $('#' + _this.messageLabelId).removeClass('alert-danger');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-success');
          $('#' + _this.messageLabelId).html(_this.messages.save200);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        },
        error: function(xhr, status, error){
          if(xhr.status == 404){
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
            $('#' + _this.messageLabelId).html(_this.messages.save404);
            $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
          }else if(xhr.status == 501){
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
            $('#' + _this.messageLabelId).html(_this.messages.save501);
            $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
          }else{
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
            $('#' + _this.messageLabelId).html(_this.messages.save500);
            $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
          }
          console.error(error);
          console.log(JSON.parse(xhr.responseText));
        }
      });
    }
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