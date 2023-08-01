export interface DeckPriceResp {
  min_price: string
  avg_price: string
  data: DeckPriceRespData[]
}

export interface DeckPriceRespData {
  card_id_from_db: number
  count: number
  serial: string
  sc_name: string
  rarity: string
  alternative_art: string
  min_price: string
  avg_price: string
  min_unit_price: string
  avg_unit_price: string
  image: string
}

export const NewDeckPriceResp = (): DeckPriceResp => {
  return {
    min_price: "",
    avg_price: "",
    data: [],
  }
}
