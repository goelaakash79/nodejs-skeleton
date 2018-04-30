/**
 * User authentication middleware
 */
import Constants from '../config/constants';

class Auth {
  /**
   * Authenticate user for valid requests
   * @param {*Object}, req
   * @param {*Object}, res
   * @param {*Object}, next
   */
  authUser = async(req, res, next) => {
    //TODO use jwt or token verification here
    next();
  }
  
}

export default new Auth();
