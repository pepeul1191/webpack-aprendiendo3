import Department from '../models/department';

var DepartmentCollection = Backbone.Collection.extend({
  model: Department,
});

export default DepartmentCollection;
