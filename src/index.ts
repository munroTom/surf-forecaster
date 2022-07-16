import scrapeMagicSeaweed from "./magic-seaweed";
// import data from "../stubbed-data.json";
import { getGoodBegginerPaddleboardingWindows } from "./magic-seaweed/paddeboarding";
import { getGoodSurfWindows } from "./magic-seaweed/surfing";
import { composeMessage } from "./messages/composeMessage";
import { groupForecasts } from "./messages/formatMessage";

main().catch((err) => {
  console.error(err);
  process.exit(0);
});

async function main() {
  const data = await scrapeMagicSeaweed();

  const paddleboarding = getGoodBegginerPaddleboardingWindows(data);

  const surfing = getGoodSurfWindows(data);

  const paddleboardingMessages = groupForecasts(paddleboarding);
  const surfingMessages = groupForecasts(surfing);

  const message = composeMessage({ paddleboardingMessages, surfingMessages });

  console.log(message);

  console.log(message.length);
}
