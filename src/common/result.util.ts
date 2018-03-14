/*
  Common functions to deal with results from the database.
 */

import { Response } from 'express';

/*
  Send correct response (along with data) according to what anything was found.
 */
export function handleResults(response: Response, docs: any = []): void {
  if (docs.length === 0) {
    response.status(204).send();
  } else {
    response
      .status(200)
      .json(docs);
  }
}

/*
  Respond with an error message & status. Other than that, console logging will
  have to do for this project... ;)
 */
export function handleFetchingError(response: Response, error): void {
  console.log(error);

  response
    .status(500)
    .send(error.message);
}