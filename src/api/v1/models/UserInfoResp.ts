export interface UserInfoResp {
  id: number
  username: string
  moecard_token: string
  jhs_token: string
  create_at: string
  update_at: string
}

export interface MeResp {
  create_at: string
  id: number
  jhs_token: string
  jhs_username: string
  moecard_password: string
  moecard_token: string
  moecard_username: string
  otp: boolean
  password: string
  update_at: string
  username: string
}
