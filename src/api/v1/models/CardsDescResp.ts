export interface CardsDescResp {
  count: number
  page_size: number
  page_current: number
  page_total: number
  data: CardsDescRespData[]
}

export interface CardsDescRespData {
  id: number
  card_id_from_db: string
  set_id: number
  set_name: string
  set_prefix: string
  serial: string
  sub_serial: string
  jap_name: string
  sc_name: string
  alternative_art: string
  rarity: string
  type: string
  color: string
  level: string
  cost: string
  cost_1: string
  evo_cond: string
  dp: string
  grade: string
  attribute: string
  class: string
  illustrator: string
  effect: string
  evo_cover_effect: string
  security_effect: string
  include_info: string
  rarity_sc: string
  image: string
}

export const NewCardsDescResp = (): CardsDescResp => {
  return {
    count: 0,
    page_size: 0,
    page_current: 0,
    page_total: 0,
    data: [],
  }
}
