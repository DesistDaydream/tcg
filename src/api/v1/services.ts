import requestInstance from "./core/core"
import type { CardSetReq } from "./models/CardSetReq"
import type { CardsDescReqQuery, CardsDescReqBody } from "./models/CardsDescReq"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsPriceReq } from "./models/CardsPriceReq"
import type { CardsPriceResp } from "./models/CardsPriceResp"
import { NewCardsDescResp } from "./models/CardsDescResp"
import type { DeckPriceResp } from "./models/DeckPriceResp"
import type { DeckPriceReq } from "./models/DeckPriceReq"

import axios from "axios"
import type { AxiosResponse } from "axios"
import type { CardSetResp } from "./models/CardSetResp"

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

export const getCardsDesc = async (
  cardsDescRespQuery: CardsDescReqQuery
): Promise<CardsDescResp> => {
  const resp = await requestInstance.get("/card/desc", { params: cardsDescRespQuery })
  return resp.data
}

export const postCardsDesc = async (
  cardsDescRespQuery: CardsDescReqQuery,
  cardsDescReqBody: CardsDescReqBody
): Promise<CardsDescResp> => {
  const resp = await requestInstance.post("/card/desc", JSON.stringify(cardsDescReqBody), {
    params: cardsDescRespQuery,
  })
  return resp.data
}

export const postCardsPrice = async (cardsPriceReq: CardsPriceReq): Promise<CardsPriceResp> => {
  const resp = await requestInstance.post("/card/price", JSON.stringify(cardsPriceReq))
  return resp.data
}

export const postDeckPrice = async (data: DeckPriceReq): Promise<DeckPriceResp> => {
  const resp = await requestInstance.post("/deck/price/json", JSON.stringify(data))
  return resp.data
}

export const getDeckPriceWithHID = async (hid: string): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/hid/" + hid)
  return resp.data
}

export const getDeckPriceWithCDID = async (cdid: string): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/cdid/" + cdid)
  return resp.data
}
