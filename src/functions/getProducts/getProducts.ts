import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { products } from "./products.mock";

export const getProductsFromDatabase = async () => {
  return products;
};

export const getProducts = async () => {
  try {
    const products = await getProductsFromDatabase();
    return formatJSONResponse({
      data: products,
    });
  } catch (e) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(e),
    };
  }
};

export const main = middyfy(getProducts);
