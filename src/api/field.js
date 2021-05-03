import axios from "./setting";

export const list = function() {
  return axios.get("/api/v1/field/list");
};