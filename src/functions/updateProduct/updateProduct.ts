import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { shopService, countService } from "../../service";
import { middyfy } from "../../libs/lambda";
import { formatJSONResponse } from "../../libs/api-gateway";
import { ProductType } from "../../models/Product";
import { z } from "zod";

const productToCUpdate = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  price: z.number().nullish(),
  cover: z.string().nullish(),
  count: z.number().nullish(),
});

export const updateProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("updateProduct", event);
    const id = event.pathParameters.id;
    const productUpd = JSON.parse(event.body) as ProductType & {
      count?: number;
    };
    console.log("productUPD", productUpd);
    delete productUpd.createdAt;
    productToCUpdate.parse(productUpd);
    try {
      const product = await shopService.updateProduct(id, {
        ...productUpd,
        updatedAt: new Date().toISOString(),
      });
      if (productUpd.count)
        await countService.update(id, { count: productUpd.count });
      return formatJSONResponse({
        ...product,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
