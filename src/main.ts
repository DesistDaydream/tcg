import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./assets/main.css"

// 第三方组件
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import VueViewer from "v-viewer"
import "viewerjs/dist/viewer.css"

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueViewer)

app.mount("#app")
