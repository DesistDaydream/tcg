// import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"

export interface TableState {
  searchParam: SearchParam
  tableData: ProductsListRespData[]
  pageNum: number
  pageSize: number
  cardsCount: number
}

export interface SearchParam {
  token: string
  keyword: string
}
