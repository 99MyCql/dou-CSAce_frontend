import axios from "./setting";

export const getCount = function() {
  return axios.get("/api/v1/paper/count");
};

export const listAuthor = function(key, offset=0, count=0) {
  return axios.post("/api/v1/paper/listAuthor", {
    "key": key,
    "offset": offset,
    "count": count
  });
};

export const getPublishVenue = function(key) {
  return axios.get(`/api/v1/paper/getPublishVenue?key=${key}`);
};