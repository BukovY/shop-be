import { handlerPath } from "@libs/handler-resolver";
import { AUTHORIZER } from "../../constants";

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/importProductsFile.importProductsFile`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
        authorizer: {
          name: AUTHORIZER,
        },
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
      },
    },
  ],
};
