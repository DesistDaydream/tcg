// import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import type { CardsPriceWithDtcgDBImgRespData } from "@/api/v1/models/CardsPriceResp"

export interface TableState {
  searchParam: searchParam
  // tableData: CardsPriceRespData[]
  tableData: CardsPriceWithDtcgDBImgRespData[]
  pageNum: number
  pageSize: number
  cardsCount: number
}

export interface searchParam {
  keyword: string
}
