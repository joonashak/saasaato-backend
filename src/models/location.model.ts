/*
  Model for Locations
  Location describes a spot (where an Observation took place) and has:
    - name
    - location (coordinates as GeoJSON type Point)
  Optionally also (used in the creation of mock data for demonstration purposes):
    - low temperature
    - high temperature
    - offset (to adjust temperature cycle to local time)
 */

import mongoose = require('mongoose');

// Enable static typing
export interface Location extends mongoose.Document {
  name: string,
  location: object,
  lowTemp: number,
  highTemp: number,
  offset: number,
}

// GeoJSON schema for representing location's coordinates
const GeoJSON = new mongoose.Schema({
  type: { type: String, required: true },
  coordinates: { type: [Number], required: true },
});

export const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: GeoJSON, required: true },
  lowTemp: Number,
  highTemp: Number,
  offset: Number,
});

export const Location = mongoose.model('Location', LocationSchema);
