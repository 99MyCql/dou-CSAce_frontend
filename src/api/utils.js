import app from "../main";

// 后端返回数据示例：{code: 0, msg: "success", data: 261}

const SUC_CODE = 0; // 成功
const CLIENT_ERR_CODE = 1; // 客户端出现错误
const SERVER_ERR_CODE = 2; // 服务端端出现错误

const rspDataFilter = function(data) {
  if (data.code === SUC_CODE) {
    // 成功
    if (data.msg != "" || data.msg != "success") {
      app.config.globalProperties.$message.success({
        message: data.msg,
      });
    }
    return true;
  } else if (data.code === CLIENT_ERR_CODE) {
    // 客户端错误
    app.config.globalProperties.$message.error({
      message: data.msg,
    });
    return false;
  } else if (data.code === SERVER_ERR_CODE) {
    // 服务端错误
    app.config.globalProperties.$message.error({
      message: "服务器发生了一些错误",
    });
    return false;
  } else {
    app.config.globalProperties.$message.error({
      message: "未知的返回状态码",
    });
    return false;
  }
};

export default rspDataFilter;