import { handlerPath } from "@libs/handler-resolver";

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/importProductsFile.importProductsFile`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
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
