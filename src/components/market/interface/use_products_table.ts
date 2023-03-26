import { onMounted, reactive, toRefs } from "vue"
import type { TableState } from "@/components/market/interface/models/card_price_table"

import type { ProductsListReqQuery } from "@/api/jhs/models/ProductsListReq"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"
import { getProductsList, putProduct } from "@/api/jhs/services"

export let usePriceTable = () => {
  // 声明响应式数据。用于存储表格数据
  const state = reactive<TableState>({
    searchParam: {
      token: "",
      keyword: "",
    },
    tableData: [],
    pageNum: 1,
    pageSize: 15,
    cardsCount: 0,
  })

  let genSellProductsTableData = () => {
    let page = state.pageNum.toString()

    const productsListReqQuery: ProductsListReqQuery = {
      game_key: "dgm",
      game_sub_key: "sc",
      keyword: state.searchParam.keyword,
      on_sale: "1",
      page: page,
      sorting: "",
      rarity: "",
    }

    getProductsList(productsListReqQuery, state.searchParam.token).then((resp) => {
      state.tableData = resp.data
      state.cardsCount = resp.total
    })
  }

  return {
    ...toRefs(state),
  }
}
