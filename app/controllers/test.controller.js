/**
 * Agency related information
 */

import { logger } from './../lib/logger';
import ResponseHelpers from './../lib/response.helpers';

import Constants from '../config/constants';
import TestMethods from './test.methods';

class TestController extends TestMethods {
  create = async (req, res) => {
    try {
      logger.info('Test CONTROLLER:::::::CREATE');
      //Todo call method
      await this.testMethod();
      return res.send(ResponseHelpers.success({}));
    } catch (err) {
      logger.error('Test CONTROLLER:::::::CREATE', err);
      return res.send(ResponseHelpers.error(err));
    }
  }
}

export default new TestController();
