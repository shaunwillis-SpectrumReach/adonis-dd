const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class DbdEventinfo extends JsonApiView {
  get attributes() {
    return [
      'eventname',
      'locationdesc',
      'locationaddress',
      'locationaddress2',
      'locationcity',
      'locationstate',
      'locationzip',
      'locdateadded',
      'locationlat',
      'locationlong',
      'eventdesc',
      'eventtime',
      'livestreamed',
      'icscalendar',
      'clientcontact',
      'pardotform',
      'scheduleofevents'
    ];
  }

}

module.exports = DbdEventinfo;
