import { handlerPath } from "@libs/handler-resolver";

export const updateProduct = {
  handler: `${handlerPath(__dirname)}/updateProduct.updateProduct`,
  events: [
    {
      http: {
        method: "put",
        path: "product/{id}",
      },
    },
  ],
};
