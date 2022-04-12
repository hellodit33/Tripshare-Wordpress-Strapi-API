'use strict';

/**
 *  geolocation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::geolocation.geolocation');
