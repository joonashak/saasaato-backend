/*
Controller for Location collection.
 */

import { Request, Response } from 'express';
import { Location } from '../models/location.model';
import { handleFetchingError, handleResults } from '../common/result.util';

// Get all locations
export async function findAll(request: Request, response: Response) {
  let locations;

  try {
    locations = await Location.find({});
    handleResults(response, locations);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Find out if given location exists
// (for validation, doesn't send a response to client)
export async function locationExists(input): Promise<boolean> {
  const query = {
    name: input.name,
    "location.coordinates": input.location.coordinates,
  };

  const results = await Location.find(query);
  return results.length === 1;
}
