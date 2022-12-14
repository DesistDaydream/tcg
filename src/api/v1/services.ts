import requestInstance from "./core/core"
import type { CardSetReq } from "./models/CardSetReq"
import type { CardSetResp } from "./models/CardSetResp"
import type { CardsDescReqQuery, CardsDescReqBody } from "./models/CardsDescReq"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsPriceReqQuery, CardsPriceReqBody } from "./models/CardsPriceReq"
import type { CardsPriceResp, CardsPriceWithDtcgDBImgResp } from "./models/CardsPriceResp"
import type { DeckPriceReqQuery } from "./models/DeckPriceReq"
import type { DeckPriceResp } from "./models/DeckPriceResp"

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

// IDE 推荐转为异步？？？
export const postCardSet = async (cardSetReq: CardSetReq): Promise<CardSetResp> => {
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

export const getDeckPriceWithCDID = async (cdid: string): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/cdid/" + cdid)
  return resp.data
}
