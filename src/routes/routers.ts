/*
  Collect routes and export their routers.
 */

import { LocationRouter as LocRouter } from './location.router';
import { ObservationRouter as ObsRouter } from './observation.router';

export const LocationRouter = new LocRouter().router;
export const ObservationRouter = new ObsRouter().router;