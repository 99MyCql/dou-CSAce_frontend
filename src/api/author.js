import axios from "./setting";

export const getCount = function() {
  return axios.get("/api/v1/author/count");
};

export const get = function(key) {
  return axios.get(`/api/v1/author/get?key=${key}`);
};

export const listPaper = function(key, offset=0, count=0, sortAttr="", sortType="") {
  return axios.post("/api/v1/author/listPaper", {
    "key": key,
    "offset": offset,
    "count": count,
    "sortAttr": sortAttr,
    "sortType": sortType
  });
};