import requestInstance from "./core/core"

import type { ProductsListReqQuery } from "./models/ProductsListReq"

export const getProductsList = async (productsListReqQuery: ProductsListReqQuery, token: string) => {
  const resp = await requestInstance.get("/market/sellers/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: productsListReqQuery,
  })
  console.log("检查 token", token)
  console.log(resp.data)

  return resp.data
}
