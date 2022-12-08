import { onMounted, reactive, toRefs } from "vue"
import type { TableState } from "@/components/dtcg/interface/models/card_price_table"
import { postCardsPrice, postCardsPriceWithDtcgDBImg } from "@/api/v1/services"
import type { CardsPriceReqQuery, CardsPriceReqBody } from "@/api/v1/models/CardsPriceReq"

export let usePriceTable = () => {
  // 声明响应式数据。用于存储表格数据
  const state = reactive<TableState>({
    searchParam: {
      keyword: "",
      alternativeArt: "",
    },
    tableData: [],
    pageNum: 0,
    pageSize: 0,
    cardsCount: 0,
  })

  // 生成卡牌价格表的数据
  let genCardPriceTableData = () => {
    const cardsPriceReqQuery: CardsPriceReqQuery = {
      page_size: state.pageSize,
      page_num: state.pageNum,
    }
    const cardsPriceReqBody: CardsPriceReqBody = {
      card_set: 0,
      color: [],
      keyword: state.searchParam.keyword,
      language: "",
      qField: [],
      rarity: [],
      alternative_art: state.searchParam.alternativeArt,
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
    genCardPriceTableData()
  })

  let handleSearch = () => {
    console.log("搜索表单数据: ", state.searchParam)
    state.pageNum = 1
    genCardPriceTableData()
  }

  let handlePageSizeChange = (pageSize: number) => {
    console.log("切换页容量: ", state.pageSize)
    state.pageNum = 1
    state.pageSize = pageSize
    genCardPriceTableData()
  }
  let handlePageNumChange = (pageNum: number) => {
    console.log("切换页码: ", state.pageNum, pageNum)
    state.pageNum = pageNum
    genCardPriceTableData()
  }

  return {
    // 解构 state，返回响应式数据。
    // 注意 state 对象被拷贝时是浅拷贝，其中非引用类型的属性在其他组件中的变化无法被监听到
    // 所以，如果要修改 state 对象中的基本类型的数据，需要重新赋值，如：state.pageSize = "xxx"
    // 而 state.searchParam 是引用属性，所以在其他组件中修改的值会被监听到
    ...toRefs(state),
    // 一些触发事件的函数
    handleSearch,
    handlePageSizeChange,
    handlePageNumChange,
  }
}
