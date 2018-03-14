/*
Router for methods offered on Location collection.
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as LocationController from '../controllers/location.controller';

export class LocationRouter {
  router;

  constructor() {
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());

    this.routes();
  }

  // Define routes
  private routes() {
    this.router.get('/', LocationController.findAll);
  }
}
