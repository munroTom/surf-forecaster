export function composeMessage(paddleboardingMessages: string[]): string {
  if (!shouldComposeMessage(paddleboardingMessages)) {
    return `No good forecasts coming up :(`;
  }

  return `Looks like there's some good forecasts coming up!

${
  paddleboardingMessages.length > 0
    ? `For paddleboarding:
    ${paddleboardingMessages.join(`
    `)}`
    : ""
}`;
}

function shouldComposeMessage(paddleboardingMessages: string[]): boolean {
  return paddleboardingMessages.length > 0;
}
