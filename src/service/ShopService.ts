import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { TABLE_NAME } from "../constants";
import { ProductType } from "../models/Product";

export default class ShopService {
  private Tablename: string = TABLE_NAME;

  constructor(private docClient: DocumentClient) {}

  async getProducts(): Promise<ProductType[]> {
    const products = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return products.Items as ProductType[];
  }

  async createProduct(todo: ProductType): Promise<ProductType> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: todo,
      })
      .promise();
    return todo as ProductType;
  }

  async getProduct(id: string): Promise<any> {
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
    return product.Item as ProductType;
  }

  async updateProduct(
    id: string,
    product: Partial<ProductType>
  ): Promise<ProductType> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { Item: product, id },
        UpdateExpression: "set #status = :status",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": true,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as ProductType;
  }

  async deleteProduct(id: string): Promise<any> {
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
