// import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import type { CardsPriceWithDtcgDBImgRespData } from "@/api/v1/models/CardsPriceResp"

export interface tableState {
  currentPage: number
  pageSize: number
  cardsCount: number
  // tableData: CardsPriceRespData[]
  tableData: CardsPriceWithDtcgDBImgRespData[]
}

export const NewTableState = (): tableState => {
  return {
    currentPage: 1,
    pageSize: 5,
    cardsCount: 0,
    tableData: [],
  }
}
