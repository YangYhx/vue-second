import axios from 'axios'
import { Message  } from 'element-ui';
import Router from '../router'

const baseURL = '/api/admin'
const fe = axios.create({
  baseURL,
  timeout:1000,
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
          setTimeout( () => {
            Router.push('/')
          },3000)
        }
          resolve(res.data)
      }).catch( err => {
        reject(err)
      })
    })

  },
  post(url, data,config){
    return new Promise( (resolve , reject) => {
      fe.post(url,data,config).then( res => {
        if(res.code == 401){
          Message .error("登录状态失效，正在跳转登录界面");
          setTimeout( () => {
            Router.push('/')
          },3000)

        }
        resolve(res.data)
      }).catch( err => {
        reject(err)
      })
    })
  }
}

export const $axios = xhr
