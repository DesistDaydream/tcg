import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"

export interface tableState {
  currentPage: number
  pageSize: number
  cardsCount: number
  tableData: CardsPriceRespData[]
}

export const NewTableState = (): tableState => {
  return {
    currentPage: 1,
    pageSize: 5,
    cardsCount: 0,
    tableData: [],
  }
}
