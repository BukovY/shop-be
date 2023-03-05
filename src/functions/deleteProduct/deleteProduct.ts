import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import shopService from "../../service";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

export const deleteProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("deleteProduct", event);
    const id = event.pathParameters.id;
    try {
      const todo = await shopService.deleteProduct(id);
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
