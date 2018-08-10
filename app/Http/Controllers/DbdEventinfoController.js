'use strict';

var moment = require('moment');
const DbdEventinfo = use('App/Model/DbdEventinfo');
const attributes = [
    'eventname',
    'locationdesc',
    'locationaddress',
    'locationaddress2',
    'locationcity',
    'locationgeneral',
    'generaldate',
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
    'clientcontactemail',
    'clientcontactphonenumber',
    'pardotform',
    'eventpics',
    'mapembed',
    'scheduleofevents'
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
  try {
    if (request.input('currentdate')) {
        const now = moment().format();
        const currentdate = yield DbdEventinfo.query().where('locdateadded', '>=', now).orderBy('locdateadded', 'asc').limit(1).fetch();
        response.jsonApi('DbdEventinfo', currentdate);
      }
      else if (request.input('previousdate')) {
        const now = moment().format();
        const currentdate = yield DbdEventinfo.query().where('locdateadded', '<', now).orderBy('locdateadded', 'asc').fetch();
        response.jsonApi('DbdEventinfo', currentdate);
      }
      else if (request.input('futuredate')) {
        const now = moment().format();
        // console.log(now);
      const currentdate = yield DbdEventinfo.query().where('locdateadded', '>', now).orderBy('locdateadded', 'asc').offset(1).fetch();
        response.jsonApi('DbdEventinfo', currentdate);
      }
      else {
        const data = yield DbdEventinfo.query().fetch();
        response.jsonApi('DbdEventinfo', data);
      }
      } catch (error) {
        console.log(error);
      }
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
