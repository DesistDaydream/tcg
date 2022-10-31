export interface DeckPrice {
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
