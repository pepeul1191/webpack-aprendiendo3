import Sex from '../models/sex';

var SexCollection = Backbone.Collection.extend({
  model: Sex,
  fill: function(){
    var _this = this;
    $.ajax({
      url: BASE_URL + 'sex/list',
      type: 'GET',
      data: {},
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data) {
        var respData = JSON.parse(data);
        for(var i = 0; i < respData.length; i++){
          var model = new Sex();
          model.set('id', respData[i]['id']);
          model.set('name', respData[i]['name']);
          // console.log(model);
          _this.add(model);
        }
      },
      error: function(xhr, status, error){
        console.error(error);
        console.log(JSON.parse(xhr.responseText));
      }
    });
  },
});

export default SexCollection;
