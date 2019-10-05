import Teacher from '../models/teacher';

var TeacherCollection = Backbone.Collection.extend({
  model: Teacher,
});

export default TeacherCollection;
