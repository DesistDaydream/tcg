import { onMounted, reactive, toRefs, ref } from "vue"
import type { SellProductsTableState } from "@/components/market/interface/models/card_price_table"

import type { ProductsListReqQuery } from "@/api/jhs/models/ProductsListReq"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"
import { getProductsList, putProduct } from "@/api/jhs/services"

import { getUserWithUID } from "@/api/v1/services"

export let useProductsTable = () => {
  // 声明响应式数据。用于存储表格数据
  const state = reactive<SellProductsTableState>({
    searchParam: {
      // userID: "",
      keyword: "",
    },
    tableData: [],
    pagination: {
      pageNum: 1,
      pageSize: 15,
      cardsCount: 0,
    },
  })

  const token = ref<string>("")

  getUserWithUID("1").then((resp) => {
    token.value = resp.jhs_token
  })

  let genSellProductsTableData = () => {
    const productsListReqQuery: ProductsListReqQuery = {
      game_key: "dgm",
      game_sub_key: "sc",
      keyword: state.searchParam.keyword,
      on_sale: "1",
      page: state.pagination.pageNum.toString(),
      sorting: "published_at_desc",
      rarity: "",
    }

    getProductsList(productsListReqQuery, token.value).then((resp) => {
      // 由于表格中那个可以改变数值的 input 只能接收 number，所以转换一下
      resp.data.forEach((item: any) => {
        item.price = Number(item.price)
      })
      // TODO: 如果数据量大，这么转换是不是不太好？~尝试使用 computed() 来监听 tableData 的变化

      state.tableData = resp.data
      state.pagination.cardsCount = resp.total
    })
  }

  return {
    ...toRefs(state),
    genSellProductsTableData,
    token,
  }
}
