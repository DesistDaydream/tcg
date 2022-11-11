export interface CardSetResp {
  count: number
  page_size: number
  page_current: number
  page_total: number
  data: Data[]
}

export interface Data {
  id: number
  series_id: number
  series_name: string
  language: string
  set_cover: string
  set_enName: string
  set_id: number
  set_japName: string
  set_name: string
  set_prefix: string
  set_releaseDate: string
  set_remark: string
}
