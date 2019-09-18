var HomeRouter = Backbone.Router.extend({
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
        alert('index???!!!');    
    },
    userCreate: function(){
        alert('userCreate');
    },
    userEdit: function(id){
        alert('userEdit ' + id);
    },
    default: function(path){
        alert(path);
        var newURL = '/' + path;
        window.location = newURL;
    },
});

export default HomeRouter;