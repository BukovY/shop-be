import { handlerPath } from "@libs/handler-resolver";

export const shopAuthorizer = {
  handler: `${handlerPath(__dirname)}/shopAuthorizer.shopAuthorizer`,
  events: [
    {
      http: {
        method: "get",
        path: "shop",
        cors: true,
        authorizer: {
          name: "shopAuthorizer",
        },
      },
    },
  ],
};
