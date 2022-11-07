export interface CardsPriceResp {
  count: number
  page_size: number
  page_current: number
  page_total: number
  data: Data[]
}

export interface Data {
  id: number
  card_id_from_db: number
  set_id: number
  set_prefix: string
  serial: string
  sc_name: string
  alternative_art: string
  rarity: string
  card_version_id: number
  min_price: number
  avg_price: number
  create_at: string
  update_at: string
  image_url: string
}

export const NewCardsPriceResp = (): CardsPriceResp => {
  return {
    count: 0,
    page_size: 0,
    page_current: 0,
    page_total: 0,
    data: [],
  }
}
