'use strict';

/**
 * geolocation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::geolocation.geolocation');
