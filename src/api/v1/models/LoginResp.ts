export interface LoginResp {
  code: number
  data: LoginData
  message: string
}

export interface LoginData {
  token: string
}
