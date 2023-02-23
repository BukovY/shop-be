import { getShopInfo } from "./getShopInfo";

describe("getShopInfo", () => {
  it("should return shop info", async () => {
    const result = await getShopInfo();
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        name: "VO",
        tel: "9379992",
      }),
    });
  });
});
