var HomeRouter = Backbone.Router.extend({
    initialize: function() {
    },
    routes:{
        '': 'index',
        'user/create': 'userCreate',
        'user/edit/:id' : 'userEdit',
        // others
        '*actions' : 'default',
    },
    index: function(){
        alert('index');    
    },
    userCreate: function(){
        alert('userCreate');
    },
    userEdit: function(id){
        alert('userEdit ' + id);
    },
});

export default HomeRouter;