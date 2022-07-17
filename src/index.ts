import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import scrapeMagicSeaweed from "./magic-seaweed";
// import data from "../stubbed-data.json";
import { getGoodBegginerPaddleboardingWindows } from "./magic-seaweed/paddeboarding";
import { getGoodSurfWindows } from "./magic-seaweed/surfing";
import { composeMessage } from "./messages/composeMessage";
import { groupForecasts } from "./messages/formatMessage";

const snsClient = new SNSClient({ region: "eu-west-2" });

export async function handler() {
  const data = await scrapeMagicSeaweed();

  const paddleboarding = getGoodBegginerPaddleboardingWindows(data);

  const surfing = getGoodSurfWindows(data);

  const paddleboardingMessages = groupForecasts(paddleboarding);
  const surfingMessages = groupForecasts(surfing);

  const message = composeMessage({ paddleboardingMessages, surfingMessages });

  const params = {
    TopicArn: "arn:aws:sns:eu-west-2:563834555809:good-surf-sms",
    Message: message,
  };

  await snsClient.send(new PublishCommand(params));
}
