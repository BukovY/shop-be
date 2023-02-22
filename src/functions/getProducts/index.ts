import { handlerPath } from "@libs/handler-resolver";

export const getProducts = {
  handler: `${handlerPath(__dirname)}/getProducts.main`,
  events: [
    {
      http: {
        cors: true,
        method: "get",
        path: "product",
      },
    },
  ],
};
