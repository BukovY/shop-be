import { handlerPath } from "@libs/handler-resolver";

export const getProduct = {
  handler: `${handlerPath(__dirname)}/getProduct.getProduct`,
  events: [
    {
      http: {
        method: "get",
        path: "product/{id}",
      },
    },
  ],
};
