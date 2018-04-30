import {
    Router
  } from "express";
  
  import TestController from "./controllers/test.controller";
  import Auth from "./middleware/auth";

  
  const router = new Router();

  /**
   *@api {post} /test/create Create test
   *@apiGroup Test
   *@apiParam {Object} data test data to be added
   *@apiParamExample {json} Input
   *  { 
   *    data: 'data here'
   *  }
   *@apiSuccessExample {json} Success
   *  HTTP/1.1 200 OK
   *@apiErrorExample {json} Internal error
   *  HTTP/1.1 500 Internal Server Error
   *@apiVersion 1.0.0
   */
  router.route('/create')
  .post(Auth.authUser, TestController.create)


  export default router;
 
