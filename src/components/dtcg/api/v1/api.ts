import request from "./request"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsDescReq } from "./models/CardsDescReq"
import type { DeckPriceResp } from "./models/DeckPriceResp"
import type { DeckPriceReq } from "./models/DeckPriceReq"
import type { AxiosResponse } from "axios"
import axios from "axios"

import type { tableRow } from "./models/tableRow"

export const postCardsDesc = (data: CardsDescReq) =>
  request.post("/card/desc", data)

export const postDeckPrice = (data: DeckPriceReq) =>
  request.post("/deck/price", data)

export const getCardsDesc = (pn: number): tableRow[] => {
  let TableItems: tableRow[] = new Array<tableRow>()
  let respData: CardsDescResp

  axios({
    method: "POST",
    url: "https://tcg.102205.xyz:8443/api/v1/card/desc",
    data: JSON.stringify({
      page_size: 10,
      page_num: pn,
    }),
  }).then((resp: AxiosResponse) => {
    respData = resp.data

    // 处理响应体数据
    respData.data.forEach((element) => {
      TableItems.push({
        sc_name: element.sc_name,
        serial: element.serial,
        alternative_art: element.alternative_art,
      })
    })
  })

  return TableItems
}
