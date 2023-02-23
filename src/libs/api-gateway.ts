export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(response),
  };
};
