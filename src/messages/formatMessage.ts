import { addHours, format } from "date-fns";
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

export function groupForecasts(forecasts: Forecast[]) {
  const grouped = forecasts.reduce((acc, { timestamp }) => {
    const date = timestampToDate(timestamp);
    const day = date.toDateString();

    if (acc[day]) {
      acc[day].endTime = formatHour(addHours(date, 3));
    } else {
      acc[day] = {
        day: format(date, "eeee"),
        startTime: formatHour(date),
        endTime: formatHour(addHours(date, 3)),
      };
    }

    return acc;
  }, {} as { [date: string]: { day: string; startTime: string; endTime: string } });

  return Object.values(grouped).map(
    ({ day, startTime, endTime }) => `On ${day} ${startTime}-${endTime}`
  );
}

function formatHour(date: Date) {
  return format(date, "haaa");
}
