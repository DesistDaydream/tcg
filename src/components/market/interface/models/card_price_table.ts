// import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import type { ProductsListRespData } from "@/api/v1/models/JhsProductsListResp"

export interface SellProductsTableState {
  searchParam: SearchParam
  tableData: ProductsListRespData[]
  pagination: Pagination
}

export interface SearchParam {
  keyword: string
}

export interface Pagination {
  pageNum: number
  pageSize: number
  cardsCount: number
}
