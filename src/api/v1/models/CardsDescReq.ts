export interface CardsDescReqQuery {
  page_size: number
  page_num: number
}

export interface CardsDescReqBody {
  keyword: string
  language: string
  class_input: boolean
  card_pack: number
  type: string
  color: any[]
  rarity: any[]
  tags: any[]
  tags__logic: string
  order_type: string
  evo_cond: EvoCond[]
  qField: string[]
}

export interface EvoCond {
  Color: string
  Cost: string
  Level: string
}
