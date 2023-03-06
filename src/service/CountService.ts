import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { COUNT_TABLE_NAME } from "../constants";
import { CountRecord } from "../models/Count";

export default class CountService {
  private Tablename: string = COUNT_TABLE_NAME;

  constructor(private docClient: DocumentClient) {}

  async getAll(): Promise<CountRecord[]> {
    const products = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return (products.Items as CountRecord[]) || [];
  }

  async get(id: string): Promise<any> {
    const product = await this.docClient
      .get({
        TableName: this.Tablename,
        Key: {
          id,
        },
      })
      .promise();
    if (!product.Item) {
      throw new Error("Id does not exit");
    }
    return product.Item as CountRecord;
  }

  async create(count: CountRecord): Promise<CountRecord> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: count,
      })
      .promise();
    return count as CountRecord;
  }

  async update(
    id: string,
    product: Partial<CountRecord>
  ): Promise<CountRecord> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { id },
        UpdateExpression:
          "set " +
          Object.keys(product)
            .map((k) => `#${k} = :${k}`)
            .join(", "),
        ExpressionAttributeNames: Object.entries(product).reduce(
          (acc, cur) => ({ ...acc, [`#${cur[0]}`]: cur[0] }),
          {}
        ),
        ExpressionAttributeValues: Object.entries(product).reduce(
          (acc, cur) => ({ ...acc, [`:${cur[0]}`]: cur[1] }),
          {}
        ),
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as CountRecord;
  }

  async delete(id: string): Promise<any> {
    return await this.docClient
      .delete({
        TableName: this.Tablename,
        Key: {
          id,
        },
      })
      .promise();
  }
}
