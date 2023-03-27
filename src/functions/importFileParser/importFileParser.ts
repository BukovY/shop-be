import { QUEUE_NAME, UPLOAD_S3_BUCKET } from "../../constants";
import { S3, SQS } from "aws-sdk";
import * as path from "path";
const csvParser = require("csv-parser");

export const importFileParser = async (event) => {
  const s3 = new S3();

  for (const record of event.Records) {
    const objectKey = record.s3.object.key;
    console.log("objectKey", objectKey);
    if (objectKey) {
      const params = {
        Bucket: UPLOAD_S3_BUCKET,
        Key: objectKey,
      };

      const parse = (stream) =>
        new Promise((_resolve, reject) => {
          const sqs = new SQS();
          stream.on("data", (data) => {
            console.log("data", data);
            sqs.sendMessage(
              {
                QueueUrl: `https://sqs.eu-west-1.amazonaws.com/935773356370/${QUEUE_NAME}`,
                MessageBody: JSON.stringify(data),
              },
              (err, data) => {
                if (err) {
                  console.log("Error", err);
                } else {
                  console.log("Success", data.MessageId);
                }
              }
            );
          });
          stream.on("error", (error) => {
            console.log(error);
            reject();
          });
          stream.on("end", async () => {
            console.log("Finished parsing CSV file");
            try {
              const dstKey = path.join("parsed", path.basename(objectKey));

              const copyParams = {
                Bucket: UPLOAD_S3_BUCKET,
                CopySource: `/${UPLOAD_S3_BUCKET}/${objectKey}`,
                Key: dstKey,
              };

              await s3.copyObject(copyParams).promise();
              console.log(`File was copied to ${dstKey}`);
              await s3.deleteObject(params).promise();
              console.log(`File was deleted from ${objectKey}`);
            } catch (err) {
              console.log(`Error copying/deleting file: ${err}`);
            }
          });
        });

      const s3Stream = s3.getObject(params).createReadStream();

      await parse(s3Stream.pipe(csvParser()));
    }
  }
};
