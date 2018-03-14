/*
  Generate mock observation data.

  Included for demonstration purposes. This generates a week's sample data.

  - Hourly data for the last 7 days
  - "Visually correct" changes according to time of day
 */

import { Location } from '../models/location.model';

/*
Generate 7 days of sine curve data for each location
 */
export function generateObservations(locations: Location[]): JSON[] {
  const observations = [];

  locations.forEach((location) => {
    const dateNow = new Date();
    const date = new Date();
    date.setUTCHours(date.getUTCHours() - 24 * 7);

    while (date < dateNow) {
      observations.push({
        "temperature": temperatureModel(location, date),
        "location": location,
        "date": date.toISOString(),
      });

      date.setUTCHours(date.getUTCHours() + 1);
    }
  });

  return observations;
}

// 24-hour sine curve
function temperatureModel(location: Location, date: Date): number {
  const highTemp = location.highTemp;
  const lowTemp = location.lowTemp;
  const hour = date.getUTCHours() + location.offset;

  const average = (highTemp + lowTemp) / 2;
  const range = Math.abs(highTemp - lowTemp);
  const delta = Math.sin(2 * Math.PI * hour / 24);

  return average + delta * range / 2;
}
