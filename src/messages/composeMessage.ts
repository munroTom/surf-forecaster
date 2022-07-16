export function composeMessage({
  surfingMessages,
}: {
  paddleboardingMessages: string[];
  surfingMessages: string[];
}): string {
  if (!shouldComposeMessage([...surfingMessages])) {
    return "";
  }

  return `Check the forecast!
https://magicseaweed.com/Tynemouth-Longsands-Surf-Report/26/

${
  surfingMessages.length > 0
    ? `Surfing:
${surfingMessages.join(`
`)}
    `
    : ""
}`;
}

function shouldComposeMessage(messages: string[]): boolean {
  return messages.length > 0;
}
