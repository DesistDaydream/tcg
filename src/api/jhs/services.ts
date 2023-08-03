import requestInstance from "./core/core"

import type { ProductsListReqQuery } from "./models/ProductsListReq"
import type { ProductsListResp } from "./models/ProductsListResp"
import type { ProductUpgradeReqBody } from "./models/ProductUpgradeReq"
import type { ProductUpgradeResp } from "./models/ProductUpgradeResp"

const jhsAPI = "https://api.jihuanshe.com/api"

// 列出商品
export const getProductsList = async (productsListReqQuery: ProductsListReqQuery, token: string): Promise<ProductsListResp> => {
  const resp = await requestInstance.get(jhsAPI + "/market/sellers/products", {
    params: productsListReqQuery,
    headers: { Authorization: "Bearer " + token },
  })

  return resp.data
}

// 更新商品
export const putProduct = async (productUpgradeReqBody: ProductUpgradeReqBody, product_id: string, token: string): Promise<ProductUpgradeResp> => {
  const resp = await requestInstance.put(jhsAPI + "/market/sellers/products/" + product_id, JSON.stringify(productUpgradeReqBody), {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "application/json",
    },
  })

  return resp.data
}
