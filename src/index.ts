import aws from "aws-sdk";
import scrapeMagicSeaweed from "./magic-seaweed";
// import data from "../stubbed-data.json";
import { getGoodBegginerPaddleboardingWindows } from "./magic-seaweed/paddeboarding";
import { getGoodSurfWindows } from "./magic-seaweed/surfing";
import { composeMessage } from "./messages/composeMessage";
import { groupForecasts } from "./messages/formatMessage";

aws.config.update({ region: "eu-west-2" });

main().catch((err) => {
  console.error(err);
  process.exit(0);
});

const phoneNumbers = ["+447947614588"];

async function main() {
  const data = await scrapeMagicSeaweed();

  const paddleboarding = getGoodBegginerPaddleboardingWindows(data);

  const surfing = getGoodSurfWindows(data);

  const paddleboardingMessages = groupForecasts(paddleboarding);
  const surfingMessages = groupForecasts(surfing);

  const message = composeMessage({ paddleboardingMessages, surfingMessages });

  await Promise.all(sendText(message));
}

function sendText(message: string) {
  return phoneNumbers.map(async (number) => {
    const params = {
      PhoneNumber: number,
      Message: message,
    };

    await new aws.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();
  });
}
