export interface CardsPriceReqQuery {
  page_size: number
  page_num: number
}

export interface CardsPriceReqBody {
  card_version_id: number
  sets_prefix: string[]
  color: any[]
  keyword: string
  language: string
  qField: string[]
  rarity: any[]
  alternative_art: string
  min_price_range: string
  avg_price_range: string
}
