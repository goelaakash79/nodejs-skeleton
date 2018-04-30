/**
 * Agency related information
 */

import { logger } from './../lib/logger';
import Request from './../lib/request';
import Test from './../models/Test';

class TestMethods extends Request {
  /**
   * Test methods.
   * @param {*Object} data, contains test information
   * returns Promise
   */
  testMethod = async () => {
    // Use schema methods here
    logger.info('Test METHODs:::::::INSERT');
    return { };
  }
}

export default TestMethods;
