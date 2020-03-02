require('dotenv').config();


module.exports = function({ projectRoot, config, mode }) {
    if (mode === 'development') {
      config.apiBaseUrl = process.env.BASE_URL;
    } else {
      config.apiBaseUrl = 'https://www.rescuingleftovercuisine.org';
    }
    return config;
}