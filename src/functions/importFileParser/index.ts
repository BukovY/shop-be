import { handlerPath } from "@libs/handler-resolver";
import { UPLOAD_S3_BUCKET } from "../../constants";

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/importFileParser.importFileParser`,
  events: [
    {
      s3: {
        bucket: UPLOAD_S3_BUCKET,
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: "uploaded/",
          },
        ],
        existing: true,
      },
    },
  ],
};
