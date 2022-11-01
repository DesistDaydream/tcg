export interface tableData {
  count: number
  page_size: number
  page_current: number
  page_total: number
  data: Data[]
}

export interface Data {
  serial: string
  sc_name: string
  alternative_art: string
}
