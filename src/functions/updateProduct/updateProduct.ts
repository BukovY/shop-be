import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { shopService, countService } from "../../service";
import { middyfy } from "../../libs/lambda";
import { formatJSONResponse } from "../../libs/api-gateway";
import { ProductType } from "../../models/Product";

export const updateProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("updateProduct", event);
    const id = event.pathParameters.id;
    const productUpd = JSON.parse(event.body) as ProductType & {
      count?: number;
    };
    console.log("productUPD", productUpd);
    delete productUpd.createdAt;
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
