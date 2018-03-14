/*
REST API serving Location and Observation collection. Serves as
the backend for the SääSäätö project.
 */

import express = require('express');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
import { LocationRouter, ObservationRouter } from './routes/routers';

// Configure the server and connect to database
class App {

  // Configuration variables for allowing CORS
  private frontendUrl = 'https://saasaato.herokuapp.com';
  private allowedMethods = 'GET, POST';

  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.database();
  }

  // Configure express middleware
  private middleware() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // Allow CORS
    this.server.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', this.frontendUrl);
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      response.header('Access-Control-Allow-Methods', this.allowedMethods);
      next();
    });
  }

  // Configure API endpoints
  private routes() {
    this.server.use('/api/locations', LocationRouter);
    this.server.use('/api/observations', ObservationRouter);
  }

  // Connect to database
  private async database() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
      console.log(err);
    }
  }

}

export default new App().server;