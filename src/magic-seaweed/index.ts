import axios from "axios";
import { MagicSeaweedData, Wind } from "./types";

export default async function scrapeMagicSeaweed(): Promise<MagicSeaweedData> {
  const response = await axios.get(
    "https://magicseaweed.com/Tynemouth-Longsands-Surf-Report/26/"
  );

  const [_, removePrefix] = response.data
    .replace(/\s+/g, "")
    .split("<script>requirejs.config({config:{'js/app':");
  const [removedSuffix] = removePrefix.split(",'js/config'");
  const ammended = removedSuffix
    .replace("storms", '"storms"')
    .replace(",forecast", ',"forecast"')
    .replace(",tide", ',"tide"')
    .replace("}}},}", "}}}}");
  const json = JSON.parse(ammended) as MagicSeaweedData;

  return {
    ...json,
    forecast: json.forecast.map((f) => ({
      ...f,
      wind: normaliseWindspeed(f.wind),
    })),
  };
}

function normaliseWindspeed(wind: Wind): Wind {
  if (wind.unit === "mph") {
    return {
      ...wind,
      speed: mphToKm(wind.speed),
      gusts: mphToKm(wind.speed),
      unit: "km",
    };
  }

  return wind;
}

function mphToKm(mph: number): number {
  return (mph * 8) / 5;
}
