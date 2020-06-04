import Vue from 'vue'
import service from './request'

export default (url = '', data = {}, type = 'POST') => {
  return new Promise((resolve, reject) => {
    service({
      method: type,
      url: Vue.prototype.reqApi.shuiwuUrl + url,
      data: data
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
};