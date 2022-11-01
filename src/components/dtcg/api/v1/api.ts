import request from "./request"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsDescReq } from "./models/CardsDescReq"

export const postCardsDesc = (data: CardsDescReq) =>
  request.post("/card/desc", data)
