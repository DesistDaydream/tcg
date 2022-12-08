export interface CardsPriceReqQuery {
  page_size: number
  page_num: number
}

export interface CardsPriceReqBody {
  card_set: number
  color: any[]
  keyword: string
  language: string
  qField: string[]
  rarity: any[]
  alternative_art: string
  min_price: number
  avg_price: number
}
