import { handlerPath } from "@libs/handler-resolver";

export const createProduct = {
  handler: `${handlerPath(__dirname)}/createProduct.createProduct`,
  events: [
    {
      http: {
        method: "post",
        path: "product",
      },
    },
  ],
};
