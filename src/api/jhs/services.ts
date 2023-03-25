import requestInstance from "./core/core"

import type { ProductsListReqQuery } from "./models/ProductsListReq"
import type { ProductsListResp } from "./models/ProductsListResp"

export const getProductsList = async (productsListReqQuery: ProductsListReqQuery, token: string): Promise<ProductsListResp> => {
  const resp = await requestInstance.get("/market/sellers/products", {
    params: productsListReqQuery,
    headers: { Authorization: "Bearer " + token },
  })
  console.log(resp)
  return resp.data
}
