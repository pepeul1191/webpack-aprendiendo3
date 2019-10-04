import parseQueryString from '../helpers/parse_query_string';
import HomeView from '../views/home_view';
import UserCreateView from '../views/user_create_view';
import UserEditView from '../views/user_edit_view';
import AutocompleteView from '../views/autocomplete_view';
import UploadView from '../views/upload_view';
import ValidationFormView from '../views/validation_form_view';
import TableLocationView from '../views/table_location_view';
import TableTeacherView from '../views/table_teacher_view';
import TableCarrersView from '../views/table_carrers_view';
import TableImageView from '../views/table_image_view';

var HomeRouter = Backbone.Router.extend({
  homeView: null,
  userEditView: null,
  userCreateView: null,
  autocompleteView: null,
  uploadView: null,
  validationFormView: null,
  tableLocationView: null,
  tableTeacherView: null,
  tableCarrersView: null,
  tableImageView: null,
  initialize: function() {
  },
  routes:{
    '': 'index',
    'user/create': 'userCreate',
    'user/edit/:id?*queryString' : 'userEdit',
    // plugins
    'autocomplete': 'autocomplete',
    'upload': 'upload',
    'validation_form': 'validationForm',
    'table/location': 'tableLocation',
    'table/carrers': 'tableCarrers',
    'table/teachers': 'tableTeachers',
    'table/images': 'tableImages',
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
  validationForm: function(){
    if(this.validationFormView == null){
      this.validationFormView = new ValidationFormView();
    }
    this.validationFormView.render();
    this.validationFormView.loadComponents();
  },
  tableLocation: function(){
    if(this.tableLocationView == null){
      this.tableLocationView = new TableLocationView();
    }
    this.tableLocationView.render();
    this.tableLocationView.loadComponents();
  },
  table_teacheT: function(){
    if(this.tableTeacherView == null){
      this.tableTeacherView = new TableTeacherView();
    }
    this.tableTeacherView.render();
    this.tableTeacherView.loadComponents();
  },
  tableCarrers: function(){
    if(this.tableCarrersView == null){
      this.tableCarrersView = new TableCarrersView();
    }
    this.tableCarrersView.render();
    this.tableCarrersView.loadComponents();
  },
  tableImages: function(){
    if(this.tableImageView == null){
      this.tableImageView = new TableImageView();
    }
    this.tableImageView.render();
    this.tableImageView.loadComponents();
  },
  default: function(path){
    // console.log(path);
    var newURL = '/' + path;
    window.location = newURL;
  },
});

export default HomeRouter;