import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import { shopService, countService } from "../../service";

export const getProducts = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    console.log("getProducts", event);
    const products = await shopService.getProducts();
    const counts = await countService.getAll();
    const productWithCount = products.map((product) => {
      return {
        ...product,
        count: counts.find((el) => el.id === product.id)?.count || 0,
      };
    });
    return formatJSONResponse({
      data: productWithCount,
    });
  }
);
