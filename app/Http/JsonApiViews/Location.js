const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Location extends JsonApiView {
  get attributes() {
    return ['name', 'address', 'phone', 'website', 'lat', 'lng'];
  }


}

module.exports = Location;
