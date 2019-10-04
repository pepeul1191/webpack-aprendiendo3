import Image from '../models/image';

var ImageCollection = Backbone.Collection.extend({
  model: Image,
});

export default ImageCollection;
