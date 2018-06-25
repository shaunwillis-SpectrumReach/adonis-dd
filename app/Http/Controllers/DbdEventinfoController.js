'use strict';

const DbdEventinfo = use('App/Model/DbdEventinfo');
const attributes = [
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
    'pardotform'
  ];

// const NodeGeocoder = require('node-geocoder');
// const Env = use('Env');

const options = {
  // provider: 'google',
  //
  // // Optional depending on the providers
  // httpAdapter: 'https', // Default
  // apiKey: Env.get('GOOGLE_API_KEY'), // for Mapquest, OpenCage, Google Premier
  // formatter: null,         // 'gpx', 'string', ...
};

// const geocoder = NodeGeocoder(options);

class DbdEventinfoController {

  * index(request, response) {
    const data = yield DbdEventinfo.query().fetch();

    response.jsonApi('DbdEventinfo', data);
  }
  //
  // * store(request, response) {
  //   const input = request.jsonApi.getAttributesSnakeCase(attributes);
  //   const foreignKeys = {
  //     user_id: request.jsonApi.getRelationId('user'),
  //   };
  //   const [result] = yield geocoder.geocode(`${input.address} Nashville`);
  //
  //   input.lat = result.latitude;
  //   input.lng = result.longitude;
  //
  //   const organization = yield DbdEventinfo.create(Object.assign({}, input, foreignKeys));
  //
  //   response.jsonApi('DbdEventinfo', organization);
  // }
  //
  * show(request, response) {
    const id = request.param('id');
    const data = yield DbdEventinfo.query().where({ id }).firstOrFail();

    response.jsonApi('DbdEventinfo', data);
  }
  //
  // * update(request, response) {
  //   const id = request.param('id');
  //   request.jsonApi.assertId(id);
  //
  //   const input = request.jsonApi.getAttributesSnakeCase(attributes);
  //   const foreignKeys = {
  //     user_id: request.jsonApi.getRelationId('user'),
  //   };
  //
  //   const categoryIds = request.jsonApi.getRelationId('categories');
  //
  //   const organization = yield DbdEventinfo.with('user', 'categories').where({ id }).firstOrFail();
  //   organization.fill(Object.assign({}, input, foreignKeys));
  //   yield organization.save();
  //   yield organization.categories().sync(categoryIds);
  //
  //   yield organization.related('categories').load();
  //
  //   response.jsonApi('DbdEventinfo', organization);
  // }
  //
  // * destroy(request, response) {
  //   const id = request.param('id');
  //
  //   const organization = yield DbdEventinfo.query().where({ id }).firstOrFail();
  //   yield organization.delete();
  //
  //   response.status(204).send();
  // }

}

module.exports = DbdEventinfoController;
