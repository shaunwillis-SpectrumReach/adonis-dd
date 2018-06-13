'use strict';

const Schema = use('Schema');

class LocationSchema extends Schema {

  up() {
    this.create('locations', (table) => {
      table.increments();
      table.string('name');
      table.string('address');
      table.string('phone');
      table.string('website');
      table.float('lat');
      table.float('lng');

      table.timestamps();
    });
  }

  down() {
    this.drop('locations');
  }

}

module.exports = LocationSchema;
