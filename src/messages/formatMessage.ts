import { Forecast } from "../magic-seaweed/types";
import { timestampToDate } from "../utils";

export function formatForecastMessage({
  timestamp,
  swell: { minBreakingHeight, maxBreakingHeight, unit },
  wind: { speed, unit: windUnit, gusts, stringDirection, compassDirection },
}: Forecast): string {
  const date = timestampToDate(timestamp);

  return `On ${date.toDateString()} at ${date.toLocaleTimeString()} the swell will be between ${minBreakingHeight}-${maxBreakingHeight}${unit} with a windspeed of ${speed}${windUnit} ${
    gusts !== speed ? `(${gusts}${windUnit} gusts) ` : ""
  }${stringDirection.toLowerCase()} (${compassDirection})`;
}
