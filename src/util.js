export const numToStr = function(num) {
  return num.toString().replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
    return s+','
  })
};