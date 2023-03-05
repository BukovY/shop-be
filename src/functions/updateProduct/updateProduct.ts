import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import shopService from "../../service";
import { middyfy } from "../../libs/lambda";
import { formatJSONResponse } from "../../libs/api-gateway";

export const updateProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("updateProduct", event);
    const id = event.pathParameters.id;
    try {
      const todo = await shopService.updateProduct(id, {});
      return formatJSONResponse({
        todo,
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
