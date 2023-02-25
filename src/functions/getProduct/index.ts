import { handlerPath } from "@libs/handler-resolver";

export const getProduct = {
  handler: `${handlerPath(__dirname)}/getProduct.main`,
  events: [
    {
      http: {
        cors: true,
        method: "get",
        path: "product/{id}",
      },
    },
  ],
};
