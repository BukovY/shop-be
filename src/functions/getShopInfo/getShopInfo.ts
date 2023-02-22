import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

const info = async () => {
  return formatJSONResponse({
    name: "VO",
    tel: "9379992",
  });
};

export const main = middyfy(info);
