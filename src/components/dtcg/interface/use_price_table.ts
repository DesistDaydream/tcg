import { onMounted, reactive, toRefs, computed } from "vue"
import type { TableState } from "@/components/dtcg/interface/models/card_price_table"
import { postCardsPrice, postCardsPriceWithDtcgDBImg } from "@/api/v1/services"
import type { CardsPriceReqQuery, CardsPriceReqBody } from "@/api/v1/models/CardsPriceReq"

export let usePriceTable = () => {
  // 声明响应式数据。用于存储表格数据
  let state = reactive<TableState>({
    searchParam: {
      keyword: "",
    },
    tableData: [],
    pageNum: 0,
    pageSize: 0,
    cardsCount: 0,
  })

  // 生成表格数据
  let genTableData = () => {
    const cardsPriceReqQuery: CardsPriceReqQuery = {
      page_size: state.pageSize,
      page_num: state.pageNum,
    }
    const cardsPriceReqBody: CardsPriceReqBody = {
      keyword: state.searchParam.keyword,
      language: "",
      class_input: false,
      card_pack: 0,
      type: "",
      color: [],
      rarity: [],
      tags: [],
      tags__logic: "",
      order_type: "",
      evo_cond: [],
      qField: [],
    }

    postCardsPriceWithDtcgDBImg(cardsPriceReqQuery, cardsPriceReqBody).then((resp) => {
      state.tableData = resp.data
      state.cardsCount = resp.count
    })
    // postCardsPrice(cardsPriceReqQuery, cardsPriceReqBody).then((resp) => {
    //   tableData.value = resp.data
    //   cardsCount.value = resp.count
    // })
  }

  // 组件挂载时(即初始化时)执行，生成表格数据
  onMounted(() => {
    state.pageNum = 1
    state.pageSize = 5
    genTableData()
  })

  let handleSearch = () => {
    console.log("执行搜索")

    state.pageNum = 1
    genTableData()
  }

  let handlePageSizeChange = (val: number) => {
    state.pageNum = 1
    genTableData()
  }
  let handlePageNumChange = (val: number) => {
    genTableData()
  }

  return {
    // 解构 state，返回响应式数据
    ...toRefs(state),
    handleSearch,
    handlePageSizeChange,
    handlePageNumChange,
  }
}
