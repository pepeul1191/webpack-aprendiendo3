import parseQueryString from '../helpers/parse_query_string';
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
    'user/edit/:id?*queryString' : 'userEdit',
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
  userEdit: function(id, queryString){
    var params = parseQueryString(queryString);
    var foo = '';
    if(params.foo){
        foo = params.foo;
    }
    if(this.userEditView == null){
      this.userEditView = new UserEditView();
    }
    this.userEditView.render(id, foo);  
  },
  default: function(path){
    // console.log(path);
    var newURL = '/' + path;
    window.location = newURL;
  },
});

export default HomeRouter;