import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { products } from "./products.mock";

const getProducts = async () => {
  return formatJSONResponse({
    data: products,
  });
};

export const main = middyfy(getProducts);
