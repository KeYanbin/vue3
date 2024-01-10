import axios from './axios'

/**
 * 根据用户id获取用户信息
 * @param {*} id  用户id
 * @returns 
 */
const getUserInfoById = (id) => {
    return axios.request({
        url: "/userinfo/one",
        method: 'get',
        params: {
            id: id
        }
    })
}


export {
    getUserInfoById
}