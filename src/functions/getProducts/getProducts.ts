import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import shopService from "../../service";

export const getProducts = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    console.log("getProducts", event);
    const products = await shopService.getProducts();
    return formatJSONResponse({
      products,
    });
  }
);
