import { getProducts, getProductsFromDatabase } from "./getProducts";
import { products } from "./products.mock";

describe("getProducts", () => {
  it("should return products", async () => {
    const result = await getProducts();
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ data: products }),
    });
  });

  it("should return products from database", async () => {
    const result = await getProductsFromDatabase();
    expect(result).toEqual(products);
  });
});
