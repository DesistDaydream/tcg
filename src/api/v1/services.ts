import requestInstance from "./core/core"
import type { CardSetReqBody } from "./models/CardSetReq"
import type { CardSetResp } from "./models/CardSetResp"
import type { CardsDescReqQuery, CardsDescReqBody } from "./models/CardsDescReq"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsPriceReqQuery, CardsPriceReqBody } from "./models/CardsPriceReq"
import type { CardsPriceResp, CardsPriceWithDtcgDBImgResp } from "./models/CardsPriceResp"
import type { DeckPriceReqQuery } from "./models/DeckPriceReq"
import type { DeckPriceResp } from "./models/DeckPriceResp"
import type { UserInfoResp } from "./models/UserInfoResp"
import type { LoginReqBody } from "./models/LoginReq"
import type { LoginResp } from "./models/LoginResp"

// export const postCardsDesc = (data: CardsDescReq): Promise<CardsDescResp> => {
//   return requestInstance
//     .post("/card/desc", JSON.stringify(data))
//     .then((resp: AxiosResponse<CardsDescResp>) => {
//       return resp.data
//     })
// }
// export const postDeckPrice = (data: DeckPriceReq): Promise<DeckPriceResp> => {
//   return requestInstance
//     .post("/deck/price", JSON.stringify(data))
//     .then((resp: AxiosResponse<DeckPriceResp>) => {
//       return resp.data
//     })
// }

export const postLogin = async (loginReqBody: LoginReqBody): Promise<LoginResp> => {
  const resp = await requestInstance.post("/login", JSON.stringify(loginReqBody))
  return resp.data
}

// IDE 推荐转为异步？？？
export const postCardSet = async (cardSetReq: CardSetReqBody): Promise<CardSetResp> => {
  const resp = await requestInstance.post("/set/desc", JSON.stringify(cardSetReq))
  return resp.data
}

// 获取所有卡牌的描述
export const getCardsDesc = async (cardsDescRespQuery: CardsDescReqQuery): Promise<CardsDescResp> => {
  const resp = await requestInstance.get("/card/desc", { params: cardsDescRespQuery })
  return resp.data
}

export const postCardsDesc = async (cardsDescRespQuery: CardsDescReqQuery, cardsDescReqBody: CardsDescReqBody): Promise<CardsDescResp> => {
  const resp = await requestInstance.post("/card/desc", JSON.stringify(cardsDescReqBody), {
    params: cardsDescRespQuery,
  })
  return resp.data
}

// 获取所有卡牌价格详情
export const getCardsPrice = async (cardsPriceReqQuery: CardsPriceReqQuery): Promise<CardsPriceResp> => {
  const resp = await requestInstance.get("/card/price", { params: cardsPriceReqQuery })
  return resp.data
}

// 根据条件获取卡牌价格详情
export const postCardsPrice = async (cardsPriceRespQuery: CardsPriceReqQuery, cardsPriceReqBody: CardsPriceReqBody): Promise<CardsPriceResp> => {
  const resp = await requestInstance.post("/card/price", JSON.stringify(cardsPriceReqBody), {
    params: cardsPriceRespQuery,
  })
  return resp.data
}

// 根据条件获取带有数码宝贝数据库中卡图的卡牌价格数据
export const postCardsPriceWithDtcgDBImg = async (
  cardsPriceRespQuery: CardsPriceReqQuery,
  cardsPriceReqBody: CardsPriceReqBody
): Promise<CardsPriceWithDtcgDBImgResp> => {
  const resp = await requestInstance.post("/card/pricewithimg", JSON.stringify(cardsPriceReqBody), {
    params: cardsPriceRespQuery,
  })
  return resp.data
}

// 根据 DTCG_DB 导出的 JSON 格式卡组信息获取卡组价格
export const postDeckPriceWithJSON = async (deckPriceReqQuery: DeckPriceReqQuery): Promise<DeckPriceResp> => {
  const resp = await requestInstance.post("/deck/price/json", JSON.stringify(deckPriceReqQuery))
  return resp.data
}

// 根据 HID 获取卡组价格
export const getDeckPriceWithHID = async (hid: string): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/hid/" + hid)
  return resp.data
}

// 根据 CDID 获取卡组价格
export const getDeckPriceWithCDID = async (cdid: string): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/cdid/" + cdid)
  return resp.data
}

// 根据集换社心愿单 ID 获取卡组价格
export const getDeckPriceWithWLID = async (wlid: string): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/wlid/" + wlid)
  return resp.data
}

// 获取用户信息
export const getUserWithUID = async (uid: string): Promise<UserInfoResp> => {
  const resp = await requestInstance.get("/user/info/" + uid)
  return resp.data
}

// 集换社接口
import type { ProductsListReqQuery } from "./models/JhsProductsListReq"
import type { ProductsListResp } from "./models/JhsProductsListResp"
import type { ProductUpgradeReqBody } from "./models/JhsProductUpgradeReq"
import type { ProductUpgradeResp } from "./models/JhsProductUpgradeResp"

// 列出我在卖的商品
export const getProductsList = async (productsListReqQuery: ProductsListReqQuery): Promise<ProductsListResp> => {
  const resp = await requestInstance.get("/jhs/market/sellers/products", {
    params: productsListReqQuery,
  })
  return resp.data
}

// 更新商品
export const putProduct = async (productUpgradeReqBody: ProductUpgradeReqBody, product_id: string): Promise<ProductUpgradeResp> => {
  const resp = await requestInstance.put("/jhs/market/sellers/products/" + product_id, JSON.stringify(productUpgradeReqBody), {
    headers: {
      "content-type": "application/json",
    },
  })
  return resp.data
}
