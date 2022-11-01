import request from "./request"
import type { CardsDescResp } from "./models/CardsDescResp"
import { NewCardsDescResp } from "./models/CardsDescResp"
import type { CardsDescReq } from "./models/CardsDescReq"
import type { DeckPriceResp } from "./models/DeckPriceResp"
import type { DeckPriceReq } from "./models/DeckPriceReq"

import axios from "axios"
import type { AxiosResponse } from "axios"

export const postCardsDesc = (data: CardsDescReq) =>
  request.post("/card/desc", data)

export const postDeckPrice = (data: DeckPriceReq) =>
  request.post("/deck/price", data)

// TODO: 如何简化？
export const getCardsDesc = async (
  pageSize: number,
  pageNum: number
): Promise<CardsDescResp> => {
  let cardsDescResp: CardsDescResp = NewCardsDescResp()

  await axios({
    method: "POST",
    url: "https://tcg.102205.xyz:8443/api/v1/card/desc",
    data: JSON.stringify({
      page_size: pageSize,
      page_num: pageNum,
    }),
  }).then((resp: AxiosResponse) => {
    cardsDescResp = resp.data
  })

  console.log("通过接口获取获取到数据后检查：", cardsDescResp.data)
  return cardsDescResp
}
