import { handlerPath } from "@libs/handler-resolver";
//import { QUEUE_NAME } from "../../constants";

export const catalogBatchProcess = {
  handler: `${handlerPath(__dirname)}/catalogBatchProcess.catalogBatchProcess`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          "Fn::GetAtt": ["SqsQueue", "Arn"],
        },
      },
    },
  ],
};
