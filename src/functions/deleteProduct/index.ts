import { handlerPath } from "@libs/handler-resolver";

export const deleteProduct = {
  handler: `${handlerPath(__dirname)}/deleteProduct.deleteProduct`,
  events: [
    {
      http: {
        method: "delete",
        path: "product/{id}",
      },
    },
  ],
};
