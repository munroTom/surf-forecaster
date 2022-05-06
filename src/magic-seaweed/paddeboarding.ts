import { timestampToDate } from "../utils";
import { Forecast, MagicSeaweedData, Swell, Wind } from "./types";

export function getGoodBegginerPaddleboardingWindows(data: MagicSeaweedData) {
  return data.forecast.filter(
    (f) => isNotTooEarly(f) && isNotWindy(f.wind) && isNotWavey(f.swell)
  );
}

function isNotWindy(wind: Wind): boolean {
  return wind.speed < 10;
}

function isNotWavey(swell: Swell): boolean {
  return swell.height < 1;
}

function isNotTooEarly(forecast: Forecast): boolean {
  // 24 hour format - in JS midnight === 1
  const hourOfDay = timestampToDate(forecast.localTimestamp).getHours() - 1;
  return hourOfDay > 3 && hourOfDay < 21;
}
