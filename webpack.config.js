function buildConfig(env) {
    return require('./config/webpack/' + env.dest + '.js')(env)
  }
  
  module.exports = buildConfig;