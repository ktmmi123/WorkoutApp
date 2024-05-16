const devConfig = require('./config.dev');
const prodConfig = require('./config.prod');

const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return prodConfig;
  }
  return devConfig;
};

module.exports = getConfig();
