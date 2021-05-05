import axios from "./setting";

export const getCount = function() {
  return axios.get("/api/v1/confSeries/count");
};

export const get = function(key) {
  return axios.get(`/api/v1/confSeries/get?key=${key}`);
};

export const listAuthor = function(key, offset=0, count=0, sortAttr="", sortType="") {
  return axios.post("/api/v1/confSeries/listAuthor", {
    "key": key,
    "offset": offset,
    "count": count,
    "sortAttr": sortAttr,
    "sortType": sortType
  });
};

export const listPaper = function(key, offset=0, count=0, sortAttr="", sortType="") {
  return axios.post("/api/v1/confSeries/listPaper", {
    "key": key,
    "offset": offset,
    "count": count,
    "sortAttr": sortAttr,
    "sortType": sortType
  });
};