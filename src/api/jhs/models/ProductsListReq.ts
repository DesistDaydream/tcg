export interface ProductsListReqQuery {
  game_key: string
  game_sub_key: string
  keyword: string
  on_sale: string
  page: string
  sorting: string // 可用的值有：price_desc,price_asc,空。空值是按照上架顺序排列
  rarity: string // 商品的罕贵度。可用的值有：异画,特典,SEC,SR,R,U,C,P
}

// export interface ProductsListReqBody {}
