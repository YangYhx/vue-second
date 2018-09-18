import axios from 'axios'
import { Message  } from 'element-ui';
import Router from '../router'

const baseURL = '/api/admin'
const fe = axios.create({
  baseURL,
  timeout:10000,
})

const xhr = {
  get( url ,data, config){
  return new Promise( (resolve , reject) => {
      fe.get(url,{
        params:{
          data,
        }
      },config).then( res => {
        if(res.code == 401){
          Message .error("登录状态失效，正在跳转登录界面");
          Router.push('/')
        }else {
          resolve(res.data)
        }
      }).catch( err => {
        reject(err)
      })
    })

  },
  post(url, data,config){
    return new Promise( (resolve , reject) => {
      fe.post(url,data,config).then( res => {
          resolve(res.data)
      }).catch( err => {
        reject(err)
      })
    })
  },
  fes(url,data,config,methods){
    return new Promise( (resolve , reject) => {
      fe[methods](url,data,config).then( res => {
        resolve(res.data)
      }).catch( err => {
        reject(err)
      })
    })
  },
  put(url,data,config){
    return this.fes(url,data,config,'put')
  }
}

export const $axios = xhr
