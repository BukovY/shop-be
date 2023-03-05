import dynamoDBClient from "../index";
import ShopService from "./ShopService";

const shopService = new ShopService(dynamoDBClient());
export default shopService;
