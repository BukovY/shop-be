import { handlerPath } from "@libs/handler-resolver";

export const getProducts = {
  handler: `${handlerPath(__dirname)}/getProducts.getProducts`,
  events: [
    {
      http: {
        method: "get",
        path: "product/",
      },
    },
  ],
};
