import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { shopService, countService } from "../../service";

export const getProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("getProduct", event);
    const id = event.pathParameters.id;
    try {
      const product = await shopService.getProduct(id);
      const count = await countService.get(id);
      console.log("count", count);
      return formatJSONResponse({
        data: {
          ...product,
          count: count.count || 0,
          id,
        },
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
