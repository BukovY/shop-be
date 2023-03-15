import { S3 } from "aws-sdk";
import { UPLOAD_S3_BUCKET } from "../../constants";

export const importProductsFile = async (event) => {
  console.log("importProductsFile", event);

  const S3Bucket = new S3();
  const params = {
    Bucket: UPLOAD_S3_BUCKET,
    Key: `uploaded/${event.queryStringParameters.name}`,
    ACL: "public-read",
    ContentType: "text/csv",
  };
  const url = await S3Bucket.getSignedUrlPromise("putObject", params);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(url),
  };
};
