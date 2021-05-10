import axios from "./setting";

// 参考：https://dblp.org/faq/13501473.html

export const search = function (query) {
  return axios.get(`/api/v1/search?query=${query}`);
};
