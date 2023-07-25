// import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"

export interface SellProductsTableState {
  searchParam: SearchParam
  tableData: ProductsListRespData[]
  pagination: Pagination
}

export interface SearchParam {
  // userID: string
  keyword: string
}

export interface Pagination {
  pageNum: number
  pageSize: number
  cardsCount: number
}
