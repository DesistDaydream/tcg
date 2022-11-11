import requestInstance from "./core/core"
import type { CardSetReq } from "./models/CardSetReq"
import type { CardsDescReq } from "./models/CardsDescReq"
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
export const postCardSet = async (data: CardSetReq): Promise<CardSetResp> => {
  const resp = await requestInstance.post("/set/desc", JSON.stringify(data))
  return resp.data
}
export const postCardsDesc = async (
  data: CardsDescReq
): Promise<CardsDescResp> => {
  const resp = await requestInstance.post("/card/desc", JSON.stringify(data))
  return resp.data
}
export const postDeckPrice = async (
  data: DeckPriceReq
): Promise<DeckPriceResp> => {
  const resp = await requestInstance.post("/deck/price", JSON.stringify(data))
  return resp.data
}
export const postCardsPrice = async (
  data: CardsPriceReq
): Promise<CardsPriceResp> => {
  const resp = await requestInstance.post("/card/price", JSON.stringify(data))
  return resp.data
}
export const getDeckPriceWithHID = async (
  hid: string
): Promise<DeckPriceResp> => {
  const resp = await requestInstance.get("/deck/price/hid/" + hid)
  return resp.data
}

// 自己实现的与后端接口交互，没有使用 axios.create
// const baseURL: string = "https://tcg.102205.xyz:8443/api/v1"
const baseURL: string = "http://localhost:52205/api/v1"
export const getCardsDesc = async (
  reqBody: CardsDescReq
): Promise<CardsDescResp> => {
  let cardsDescResp: CardsDescResp = NewCardsDescResp()

  await axios({
    method: "POST",
    url: baseURL + "/card/desc",
    data: JSON.stringify(reqBody),
  }).then((resp: AxiosResponse) => {
    cardsDescResp = resp.data
  })

  console.log("从接口获取到数据后检查：", cardsDescResp.data)
  return cardsDescResp
}
