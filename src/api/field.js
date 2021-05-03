import axios from "./setting";

export const list = function() {
  return axios.get("/api/v1/field/list");
};

export const listVenue = function(key, offset=0, count=0, sortAttr="", sortType="") {
  return axios.post("/api/v1/field/listVenue", {
    "key": key,
    "offset": offset,
    "count": count,
    "sortAttr": sortAttr,
    "sortType": sortType
  });
};

export const listAuthor = function(key, offset=0, count=0, sortAttr="", sortType="") {
  return axios.post("/api/v1/field/listAuthor", {
    "key": key,
    "offset": offset,
    "count": count,
    "sortAttr": sortAttr,
    "sortType": sortType
  });
};

export const listPaper = function(key, offset=0, count=0, sortAttr="", sortType="") {
  return axios.post("/api/v1/field/listPaper", {
    "key": key,
    "offset": offset,
    "count": count,
    "sortAttr": sortAttr,
    "sortType": sortType
  });
};