import { ElMessage } from "element-plus"

export const validationToken = (): boolean => {
  let token = localStorage.getItem("token")
  console.log(token)

  if (token == null) {
    ElMessage({
      message: "请登录",
      type: "error",
    })
    return false
  }
  return true
}
