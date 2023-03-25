import requestInstance from "./core/core"

import type { ProductsListReqQuery } from "./models/ProductsListReq"
import type { ProductsListResp } from "./models/ProductsListResp"
import type { ProductUpgradeReqBody } from "./models/ProductUpgradeReq"
import type { ProductUpgradeResp } from "./models/ProductUpgradeResp"

export const getProductsList = async (productsListReqQuery: ProductsListReqQuery, token: string): Promise<ProductsListResp> => {
  const resp = await requestInstance.get("/market/sellers/products", {
    params: productsListReqQuery,
    headers: { Authorization: "Bearer " + token },
  })
  return resp.data
}

export const putProduct = async (productUpgradeReqBody: ProductUpgradeReqBody, product_id: string, token: string): Promise<ProductUpgradeResp> => {
  const resp = await requestInstance.put("/market/sellers/products/" + product_id, JSON.stringify(productUpgradeReqBody), {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "application/json",
    },
  })
  console.log(resp.data)

  return resp.data
}
