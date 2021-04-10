import axios from "./setting";

export const getCount = function() {
  return axios.get("/api/v1/author/count");
};