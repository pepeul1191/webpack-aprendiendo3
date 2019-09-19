import UserCreateView from '../views/user_create_view';

var HomeRouter = Backbone.Router.extend({
  homeView: null,
  userEditView: null,
  userCreateView: null,
  initialize: function() {
  },
  routes:{
    '': 'index',
    'user/create': 'userCreate',
    'user/edit/:id' : 'userEdit',
    // others
    '*path' : 'default',
  },
  index: function(){
    if(this.userCreateView == null){
      this.userCreateView = new UserCreateView();
    }
      this.userCreateView.render();  
    },
    userCreate: function(){
      alert('userCreate');
    },
    userEdit: function(id){
      alert('userEdit ' + id);
    },
    default: function(path){
      console.log(path);
      var newURL = '/' + path;
      window.location = newURL;
    },
});

export default HomeRouter;