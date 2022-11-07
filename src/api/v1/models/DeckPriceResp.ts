export interface DeckPriceResp {
  min_price: string
  avg_price: string
  data: Data[]
}

export interface Data {
  count: number
  serial: string
  sc_name: string
  alternative_art: string
  min_price: string
  avg_price: string
}

export const NewDeckPriceResp = (): DeckPriceResp => {
  return {
    min_price: "",
    avg_price: "",
    data: [],
  }
}
