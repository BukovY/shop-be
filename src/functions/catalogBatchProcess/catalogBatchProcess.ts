import { SQSEvent, SQSHandler } from "aws-lambda";
import { DynamoDB, SNS } from "aws-sdk";
import { COUNT_TABLE_NAME, TABLE_NAME, TOPIC } from "../../constants";

const sns = new SNS();
const dynamo = new DynamoDB.DocumentClient();

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
  console.log("catalogBatchProcess", event);
  try {
    const products = event.Records.map((record) => JSON.parse(record.body));
    console.log("products", products);
    const productsToCreate = products.map((product) => ({
      PutRequest: {
        Item: {
          ...product,
          id: product.id || "0",
          createdAt: new Date().toISOString(),
        },
      },
    }));
    const productsToCreateCount = products.map((product) => ({
      PutRequest: {
        Item: {
          id: product.id || "0",
          count: product.count || "0",
        },
      },
    }));
    console.log("productsToCreate", productsToCreate);
    console.log("productsToCreateCount", productsToCreateCount);
    await dynamo
      .batchWrite({
        RequestItems: {
          [TABLE_NAME]: productsToCreate,
          [COUNT_TABLE_NAME]: productsToCreateCount,
        },
      })
      .promise();
    await sns
      .publish({
        Subject: "Products created",
        Message: JSON.stringify(products),
        TopicArn: `arn:aws:sns:eu-west-1:935773356370:${TOPIC}`,
      })
      .promise();
  } catch (e) {
    console.log(e);
  }
};
