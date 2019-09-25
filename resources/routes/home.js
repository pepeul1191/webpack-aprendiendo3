import parseQueryString from '../helpers/parse_query_string';
import HomeView from '../views/home_view';
import UserCreateView from '../views/user_create_view';
import UserEditView from '../views/user_edit_view';
import AutocompleteView from '../views/autocomplete_view';
import UploadView from '../views/upload_view';
import ValidationFormView from '../views/validation_form_view';

var HomeRouter = Backbone.Router.extend({
  homeView: null,
  userEditView: null,
  userCreateView: null,
  autocompleteView: null,
  uploadView: null,
  validationFormView: null,
  initialize: function() {
  },
  routes:{
    '': 'index',
    'user/create': 'userCreate',
    'user/edit/:id?*queryString' : 'userEdit',
    // plugins
    'autocomplete': 'autocomplete',
    'upload': 'upload',
    'validation_form': 'validation_form',
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
  autocomplete: function(){
    if(this.autocompleteView == null){
      this.autocompleteView = new AutocompleteView();
    }
    this.autocompleteView.render();
    this.autocompleteView.loadComponents();
  },
  upload: function(){
    if(this.uploadView == null){
      this.uploadView = new UploadView();
    }
    this.uploadView.render();
    this.uploadView.loadComponents();
  },
  validation_form: function(){
    if(this.validationFormView == null){
      this.validationFormView = new ValidationFormView();
    }
    this.validationFormView.render();
    this.validationFormView.loadComponents();
  },
  default: function(path){
    // console.log(path);
    var newURL = '/' + path;
    window.location = newURL;
  },
});

export default HomeRouter;