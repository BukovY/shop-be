import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import shopService from "../../service";
import { middyfy } from "../../libs/lambda";
import { v4 } from "uuid";
import { formatJSONResponse } from "../../libs/api-gateway";

export const createProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("createProduct", event);
    try {
      const { title, description, price, cover } = JSON.parse(event.body);
      const id = v4();
      const product = await shopService.createProduct({
        id,
        title,
        description,
        price,
        cover,
        createdAt: new Date().toISOString(),
      });
      return formatJSONResponse({
        product,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
