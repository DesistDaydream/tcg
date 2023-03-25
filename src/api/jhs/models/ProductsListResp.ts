export interface ProductsListResp {
  current_page: number
  data: ProductsListRespData[]
  from: number
  last_page: number
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface ProductsListRespData {
  authenticator_id: null
  authenticator_name: null
  avg_price: string
  card_id: number
  card_name_cn: string
  card_name_cn_cnocg: null
  card_version_id: number
  card_version_image: string
  card_version_number: string
  card_version_rarity: string
  condition: number
  grading: null
  min_price: string
  number_alias: string
  on_sale: number
  price: string
  product_id: number
  product_language: string
  quantity: number
  remark: string
}

export const NewProductsListResp = (): ProductsListResp => {
  return {
    current_page: 0,
    data: [],
    from: 0,
    last_page: 0,
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0,
  }
}
