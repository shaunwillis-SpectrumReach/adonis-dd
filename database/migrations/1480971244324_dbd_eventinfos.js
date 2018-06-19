'use strict';

const Schema = use('Schema');

class DbdEventinfoSchema extends Schema {

  up() {
    this.create('dbd_eventinfos', (table) => {
      table.increments();
      table.string('eventname').notNullable();
      table.text('locationdesc');
      table.string('locationaddress');
      table.string('locationaddress2');
      table.string('locationcity');
      table.string('locationstate');
      table.string('locationzip');
      table.timestamp('locdateadded');
      table.string('locationlat');
      table.string('locationlong');
      table.text('eventdesc');
      table.time('eventtime');
      table.bit('livestreamed', 1);
      table.string('icscalendar');
      table.string('clientcontact');
      table.string('pardotform');

      table.timestamps();
    });
  }

  down() {
    this.drop('dbd_eventinfos');
  }

}

module.exports = DbdEventinfoSchema;
