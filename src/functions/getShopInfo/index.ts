import { handlerPath } from "@libs/handler-resolver";

export const info = {
  handler: `${handlerPath(__dirname)}/getShopInfo.main`,
  events: [
    {
      http: {
        cors: true,
        method: "get",
        path: "info",
      },
    },
  ],
};
