export interface ProductsListReqQuery {
  game_key: string
  game_sub_key: string
  keyword: string
  on_sale: string
  page: string
  sorting: string // 排序逻辑。published_at_desc,price_desc,price_asc。默认值: published_at_desc。published_at_desc 是按照上架时间从新到旧，其他值是按照上架时间从旧到新。
  rarity: string // 商品罕贵度。可用的值有：异画,特典,SEC,SR,R,U,C,P。默认值: ""。
}
