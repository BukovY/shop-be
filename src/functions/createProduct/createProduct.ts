import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { shopService, countService } from "../../service";
import { middyfy } from "../../libs/lambda";
import { v4 } from "uuid";
import { z } from "zod";
import { formatJSONResponse } from "../../libs/api-gateway";

const productToCreate = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  cover: z.string().nullish(),
  count: z.number(),
});

export const createProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("createProduct", event);
    try {
      const { title, description, price, cover, count } = JSON.parse(
        event.body
      );
      productToCreate.parse({ title, description, price, cover, count });
      const id = v4();
      const product = await shopService.createProduct({
        id,
        title,
        description,
        price,
        cover,
        createdAt: new Date().toISOString(),
      });
      await countService.create({ id, count });
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
