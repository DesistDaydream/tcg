import request from "./request"
import type { CardsDescResp } from "./models/CardsDescResp"
import type { CardsDescReq } from "./models/CardsDescReq"
import type { DeckPriceResp } from "./models/DeckPriceResp"
import type { DeckPriceReq } from "./models/DeckPriceReq"

export const postCardsDesc = (data: CardsDescReq) =>
  request.post("/card/desc", data)

export const postDeckPrice = (data: DeckPriceReq) =>
  request.post("/deck/price", data)
