/*
Router for methods offered on Observation collection.
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ObservationController from '../controllers/observation.controller';

export class ObservationRouter {
  router;

  constructor() {
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());

    this.routes();
  }

  // Define routes
  private routes() {
    this.router.get('/', ObservationController.findAll);
    this.router.post('/', ObservationController.create);
    this.router.get('/latest/all', ObservationController.findLatestForAll);
    this.router.get('/latest/:location', ObservationController.findLatest);
    this.router.get('/all/grouped', ObservationController.findAllGrouped);
    this.router.get('/all/:location', ObservationController.findAllByLocation);
    this.router.get('/range24h', ObservationController.find24hRangeForAll);
    this.router.get('/reset', ObservationController.resetDatabase);
  }
}
