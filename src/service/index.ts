import dynamoDBClient from "../index";
import ShopService from "./ShopService";
import CountService from "./CountService";

export const shopService = new ShopService(dynamoDBClient());
export default shopService;
export const countService = new CountService(dynamoDBClient());
