import axios from './axios'
/**
  @author keyanbin
 */
const getArticleCatAll = () => {
    return axios.request({
        url: '/articleCat/all',
        method: 'get'
    })
}
/**
 * 获取所有文章
 * @param {*} cateId 
 * @returns 
 */
const getArticlesByCateId = () => {
    return axios.request({
        url: `/article/all`,
        method: 'get'
    })
}

/**
 * 根据分类id获取文章
 */
const getArticleById = (id) => {
    return axios.request({
        url: `/article/${id}`,
        method: 'get'
    })
}

/**
 * 根据文章id获取文章内容
 */
const getArticleContentById = (id) => {
    return axios.request({
        url: "/article/one",
        method: 'get',
        params: {
            id: id
        }
    })
}
export {
    getArticleCatAll,
    getArticlesByCateId,
    getArticleById,
    getArticleContentById
}