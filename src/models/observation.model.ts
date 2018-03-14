/*
  Model for Observations
  Observation describes the data related to a single observation event. It has:
    - temperature
    - location (model: location.model.ts)
    - date
 */

import mongoose = require('mongoose');
import mongoosePaginate = require('mongoose-paginate');
import { LocationSchema } from './location.model';
import { locationExists } from '../controllers/location.controller';

// Enable static typing
export interface Observation extends mongoose.Document {
  temperature: number,
  location: object,
  date: string,
}

const ObservationSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
    min: [-90],
    max: [70],
  },
  location: {
    type: LocationSchema,
    required: true,
    validate: locationExists,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ObservationSchema.plugin(mongoosePaginate);

export const Observation = mongoose.model('Observation', ObservationSchema);
