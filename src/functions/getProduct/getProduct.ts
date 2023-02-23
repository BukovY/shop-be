import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { product } from "./product.mock";

export const getProduct = async (event) => {
  try {
    return formatJSONResponse({
      data: { ...product, id: event.pathParameters.id },
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        errors: [{ detail: error.message, title: error.name }],
      }),
      headers: { "Content-Type": "application/json" },
    };
  }
};

export const main = middyfy(getProduct);
