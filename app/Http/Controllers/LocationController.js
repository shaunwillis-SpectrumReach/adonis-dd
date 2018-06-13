'use strict';

const Location = use('App/Model/Location');
const attributes = ['name', 'address', 'phone', 'website', 'lat', 'lng'];

const NodeGeocoder = require('node-geocoder');
const Env = use('Env');

const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: Env.get('GOOGLE_API_KEY'), // for Mapquest, OpenCage, Google Premier
  formatter: null,         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

class LocationController {

  * index(request, response) {
    const data = Location.query().fetch

    const organizations = yield query.fetch();

    response.jsonApi('Location', organizations);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };
    const [result] = yield geocoder.geocode(`${input.address} Nashville`);

    input.lat = result.latitude;
    input.lng = result.longitude;

    const organization = yield Location.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Location', organization);
  }

  * show(request, response) {
    const id = request.param('id');
    const organization = yield Location.with('user', 'categories').where({ id }).firstOrFail();

    response.jsonApi('Location', organization);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };

    const categoryIds = request.jsonApi.getRelationId('categories');

    const organization = yield Location.with('user', 'categories').where({ id }).firstOrFail();
    organization.fill(Object.assign({}, input, foreignKeys));
    yield organization.save();
    yield organization.categories().sync(categoryIds);

    yield organization.related('categories').load();

    response.jsonApi('Location', organization);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const organization = yield Location.query().where({ id }).firstOrFail();
    yield organization.delete();

    response.status(204).send();
  }

}

module.exports = LocationController;
