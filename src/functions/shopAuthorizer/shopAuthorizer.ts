import { PolicyDocument, APIGatewayAuthorizerResult } from "aws-lambda";

export const shopAuthorizer = async (event, _, cb) => {
  console.log("Event: ", event);

  if (event.type !== "TOKEN") {
    cb("Unauthorized");
  }

  try {
    const authorizationToken = event.authorizationToken.split(" ")[1];
    const buff = Buffer.from(authorizationToken, "base64");
    const [username, password] = buff.toString("utf-8").split(":");

    console.log(`username: ${username}, password: ${password}`);

    const storedUserPassword = process.env[username];
    console.log(`storedUserPassword: ${storedUserPassword}`);
    const effect =
      !storedUserPassword || storedUserPassword !== password ? "Deny" : "Allow";

    console.log(`effect: ${effect}`);
    return cb(null, generateResponse(username, effect, event.methodArn));
  } catch (error) {
    console.log(error);
    cb("Unauthorized");
  }
};

type Effect = "Allow" | "Deny";
function generatePolicy(effect: Effect, resource: string): PolicyDocument {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  };
}

function generateResponse(
  principalId: string,
  effect: Effect,
  resource: string
): APIGatewayAuthorizerResult {
  return {
    principalId,
    policyDocument: generatePolicy(effect, resource),
  };
}
