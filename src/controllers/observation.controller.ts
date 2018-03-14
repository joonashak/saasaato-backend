/*
Controller for Observation collection.
 */

import { Observation } from '../models/observation.model';
import { handleFetchingError, handleResults } from '../common/result.util';
import { Request, Response } from 'express';
import { generateObservations } from '../common/data.util';
import { Location } from '../models/location.model';

// Get all observations
export async function findAll(request: Request, response: Response) {
  let observations;

  try {
    observations = await Observation.find({});
    handleResults(response, observations);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Get the latest observation for a given location
export async function findLatest(request: Request, response: Response) {
  let latest;
  const conditions = { "location.name": request.params.location };

  try {
    latest = await Observation.findOne(conditions).sort('-date');
    handleResults(response, latest);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Get latest observations for every location
export async function findLatestForAll(request: Request, response: Response) {
  let observations;

  // Query stages for aggregation pipeline
  const sortDate = { $sort: { "date": -1 } };
  const group = {
    $group: {
      _id: "$location.name",
      observations: { $push: "$$ROOT" },
    },
  };
  const findOne = {
    $replaceRoot: {
      newRoot: { $arrayElemAt: ["$observations", 0] },
    },
  };
  const sortAlpha = { $sort: { "location.name": 1 } };

  try {
    observations = await Observation.aggregate([sortDate, group, findOne, sortAlpha]);
    handleResults(response, observations);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Get max and min temperatures of last 24 hrs for each location
export async function find24hRangeForAll(request: Request, response: Response) {
  let observations;

  // Query stages for aggregation pipeline
  const range = {
    $match: {
      date: {
        $lt: new Date(),
        $gt: new Date(new Date().setDate(new Date().getDate()-1)),
      },
    },
  };
  const group = {
    $group: {
      _id: "$location.name",
      "max": { "$max": "$temperature" },
      "min": { "$min": "$temperature" },
    },
  };
  const format = {
    $replaceRoot: {
      newRoot: {
        name: "$_id",
        max: "$max",
        min: "$min",
      },
    },
  };

  try {
    observations = await Observation.aggregate([range, group, format]);
    handleResults(response, observations);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

export async function findAllGrouped(request: Request, response: Response) {
  let observations;

  // Query stages for aggregation pipeline
  const sortDate = { $sort: { "date": 1 } };
  const group = {
    $group: {
      _id: "$location.name",
      temperatures: {
        $push: { "temperature": "$temperature" },
      },
      dates: {
        $push: { "date": "$date" },
      },
    },
  };
  const sortAlpha = { $sort: { "_id": 1 } };

  try {
    observations = await Observation.aggregate([sortDate, group, sortAlpha]);
    handleResults(response, observations);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Get all observations for a given location (sorted by date)
export async function findAllByLocation(request: Request, response: Response) {
  let observations;
  const conditions = { "location.name": request.params.location };

  try {
    observations = await Observation.find(conditions).sort('date');
    handleResults(response, observations);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Create a new observation
export async function create(request: Request, response: Response) {
  let newObservation = {
    temperature: request.body.temperature,
    location: request.body.location,
  };

  try {
    newObservation = await Observation.create(newObservation);
    handleResults(response, newObservation);
  } catch (error) {
    handleFetchingError(response, error);
  }
}

// Reset database to auto-generated sample data set
// (For demonstration purposes)
export async function resetDatabase(request: Request, response: Response) {
  let observations;

  try {
    observations = generateObservations(await Location.find({}));
    await Observation.remove();
    await Observation.insertMany(observations);
    handleResults(response);
  } catch (error) {
    handleFetchingError(response, error);
  }

}
