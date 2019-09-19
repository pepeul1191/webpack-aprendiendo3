import HomeView from '../views/home_view';
import UserCreateView from '../views/user_create_view';
import UserEditView from '../views/user_edit_view';

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
    if(this.homeView == null){
      this.homeView = new HomeView();
    }
    this.homeView.render();  
  },
  userCreate: function(){
    if(this.userCreateView == null){
      this.userCreateView = new UserCreateView();
    }
    this.userCreateView.render();  
  },
  userEdit: function(id){
    if(this.userEditView == null){
      this.userEditView = new UserEditView();
    }
    this.userEditView.render(id);  
  },
  default: function(path){
    // console.log(path);
    var newURL = '/' + path;
    window.location = newURL;
  },
});

export default HomeRouter;