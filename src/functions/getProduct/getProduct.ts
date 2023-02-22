import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { product } from "./product.mock";

const info = async (event) => {
  return formatJSONResponse({
    data: { ...product, id: event.pathParameters.id },
  });
};

export const main = middyfy(info);
