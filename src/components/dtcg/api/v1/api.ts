import request from "./request"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsDescReq } from "./models/CardsDescReq"
import type { DeckPriceResp } from "./models/DeckPriceResp"
import type { DeckPriceReq } from "./models/DeckPriceReq"
import type { tableData } from "./models/tableData"

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
): Promise<tableData> => {
  const tableData: tableData = {
    count: 0,
    page_size: 0,
    page_current: 0,
    page_total: 0,
    data: [],
  }

  await axios({
    method: "POST",
    url: "https://tcg.102205.xyz:8443/api/v1/card/desc",
    data: JSON.stringify({
      page_size: pageSize,
      page_num: pageNum,
    }),
  }).then((resp: AxiosResponse) => {
    let respData: CardsDescResp = resp.data

    // 处理响应体数据
    respData.data.forEach((element) => {
      tableData.data.push({
        sc_name: element.sc_name,
        serial: element.serial,
        alternative_art: element.alternative_art,
      })
    })
    tableData.count = respData.count
  })

  console.log("检查数据：", tableData.data)
  return tableData
}
