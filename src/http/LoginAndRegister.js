// src/http/index.js
//创建统一请求api
import axios from './axios'
/**
  @author keyanbin
  @params data 请求参数 json 格式
  @description 用户登录方法
*/
const login=(data)=>{
    return axios.request({
        url:'/mobile/elogin',//api/mobile/elogin
        method:'post',
        data
    })
}
/**
 * 
 * @param {*} data 
 * @description 用户注册方法
 */
const register = (data) => {
    return axios.request({
        url:'/mobile/eregister',
        method:'post',
        data
    })
}

//导出请求方法
export {
    login,
    register
}