import { timestampToDate } from "../utils";
import { Forecast, MagicSeaweedData, Swell } from "./types";

export function getGoodSurfWindows(data: MagicSeaweedData) {
  return data.forecast.filter(
    (f) => isNotTooEarly(f) && periodIsLongEnough(f.swell) && hasGoodRating(f)
  );
}

function hasGoodRating(forecast: Forecast): boolean {
  return forecast.fadedRating > 0;
}

function periodIsLongEnough(swell: Swell): boolean {
  return swell.period > 6;
}

function isNotTooEarly(forecast: Forecast): boolean {
  // 24 hour format - in JS midnight === 1
  const hourOfDay = timestampToDate(forecast.localTimestamp).getHours() - 1;
  return hourOfDay > 3 && hourOfDay < 21;
}
