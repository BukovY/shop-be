import { getProduct } from "./getProduct";
import { product } from "./product.mock";

describe("getProduct", () => {
  it("should return product", async () => {
    const productId = "1";
    const result = await getProduct({ pathParameters: { id: productId } });
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ data: { ...product, id: productId } }),
    });
  });
});
