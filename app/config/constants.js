import path from 'path';
import merge from 'lodash/merge';
// Default configuations applied to all environments

/**
 * Default app configuration
 */
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production',
    };
  },

  version: require('../../package.json').version,
  root: path.normalize(path.join(__dirname, '/../../..')),
  port: process.env.PORT || 8000,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '/api', // Could be /api/resource or /api/v2/resource

  /**
   * MongoDB configuration options
   */
  mongo: {
    seed: true,
    options: {
      db: {
        safe: true,
      },
    },
  },

  /**
   * Services configurtion options- AWS, Calq.io, keywords, projects, etc (All the .env variables)
   */
  services: {
    
  }


};

// Environment specific overrides
const environmentConfigs = {
  development: {
    mongo: {
      uri: process.env.MONGO_URL || 'mongodb://localhost:27017/missionapp',
    },
    security: {
      saltRounds: 4,
    },
  },
  test: {
    port: 6010,
    mongo: {
      uri: process.env.MONGO_URL || 'mongodb://localhost:27017/missionapp',
    },
    security: {
      saltRounds: 4,
    },
  },
  production: {
    mongo: {
      seed: false,
      uri: process.env.MONGO_URL,
    },
  },
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
