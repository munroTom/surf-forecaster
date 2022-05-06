type SwellComponent = {
  height: number;
  absHeight: number;
  period: number;
  absPeriod: number;
  windSeaFraction: number;
  power: number;
  impact: number;
  direction: number;
  trueDirection: number;
  directionalSpread: number;
  // TODO: get all possible values
  compassDirection: string;
  isOffshore: boolean;
  type: number;
  absBreakingHeight: number;
};
export type Swell = {
  height: number;
  absHeight: number;
  absMinBreakingHeight: number;
  absMaxBreakingHeight: number;
  incomingSwellCount: number;
  direction: number;
  trueDirection: number;
  compassDirection: string; // 'E'
  period: number;
  probability: number;
  unit: "ft";
  minBreakingHeight: number;
  maxBreakingHeight: number;
  //   TODO: check if there are tertiary components
  components: { primary: SwellComponent; secondary: SwellComponent };
};

type CompassDirection =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "SSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW";

type StringDirection =
  | "Onshore"
  | "Offshore"
  | "Cross/Offshore"
  | "Cross/Onshore";

export type Wind = {
  speed: number;
  direction: number;
  trueDirection: number;
  compassDirection: CompassDirection;
  chill: number;
  gusts: number;
  unit: string;
  rating: 3;
  // TODO: get all possible combinations of this
  stringDirection: StringDirection;
};

export type Forecast = {
  timestamp: number;
  localTimestamp: number;
  issueTimestamp: number;
  fadedRating: number;
  solidRating: number;
  en_threeHourTimeText: string;
  threeHourTimeText: string;
  timezoneAbbr: string;
  swell: Swell;
  wind: Wind;
};

export type MagicSeaweedData = {
  storms: { active: any[]; chart: string; currentTimestamp: number };
  forecast: Forecast[];
  tides: {
    [date: string]: {
      timestamp: number;
      tide: {
        shift: number;
        state: "High" | "Low";
        unixtime: number;
        timestamp: number;
        timezoneOffset: number;
      }[];
      unit: "m";
      sunriseTwilight: number;
      sunrise: number;
      sunsetTwilight: number;
      sunset: number;
      images: {
        full: string;
      };
      levels: { shift: number; timezoneOffset: number; unixtime: number }[];
      port: { name: string; distance: number; unit: "miles" };
    };
  };
};
