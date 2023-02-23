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

export const main = middyfy(getProducts);
