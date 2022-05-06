import scrapeMagicSeaweed from "./magic-seaweed";
import { getGoodBegginerPaddleboardingWindows } from "./magic-seaweed/paddeboarding";
import { composeMessage } from "./messages/composeMessage";
import { formatForecastMessage } from "./messages/formatMessage";

main().catch((err) => {
  console.error(err);
  process.exit(0);
});

async function main() {
  const data = await scrapeMagicSeaweed();

  const paddleboarding = getGoodBegginerPaddleboardingWindows(data);

  const paddleboardingMessages = paddleboarding.map(formatForecastMessage);

  const message = composeMessage(paddleboardingMessages);

  console.log(message);
}
