<template>
    <div class="box">
        <el-scrollbar ref="scrollbar">
            <div class="scrollbar-flex-content">
                <p v-for="item in articleCats" :key="item" class="scrollbar-demo-item">
                    <span @click="toArticle(item.id)" v-if="item.showInNav"
                        :style="{ color: item.id === selectedId ? 'red' : 'black' }">{{
                            item.catName }}</span>
                </p>
            </div>
        </el-scrollbar>

        <div class="btn">
            <el-button type="primary" :icon="Operation" @click="drawer = true" />
        </div>
    </div>
    <el-drawer v-model="drawer" title="选择频道" size="50%" direction="ttb">
        <div class="el-drawer-flex-content">
            <div v-for="item in articleCats" :key="item" class="el-drawer-item">
                <p @click="setItem(item)">{{ item.catName }}</p>
            </div>
        </div>
    </el-drawer>
    <el-divider />

    <kCard :articles="articles" :showCard="showCard" @getArticleDetail="getArticleDetail" />
</template>

<script setup>
import { Operation } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue';
import { getArticleCatAll, getArticlesByCateId, getArticleById } from '../../http/article'
import { getUserInfoById } from '../../http/User'
import axios from 'axios';
import kCard from '../../components/k-card.vue'
// 1. 引入useRouter 或 useRoute
import { useRouter } from 'vue-router'

// 2. 调用useRouter函数
const $r = useRouter();

const that = this

const articleCats = ref([])
const articles = ref([])
const drawer = ref(false)
const innerDrawer = ref(false)
const selectedId = ref(4) // 默认没有选中的 ID
const showCard = ref(true)



const handleClose = () => {
    ElMessageBox.confirm('You still have unsaved data, proceed?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}


/**
 * 根据用户id获取用户信息
 */

const getUserName = (id) => {
    getUserInfoById(id).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based hence the +1
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


/**
 * 根据分类id获取文章
 * @param {*} cateId 
 */
const toArticle = (cateId) => {
    selectedId.value = cateId
    getArticleById(cateId).then(res => {
        console.log(res);
        if (res.code == 1) {
            showCard.value = true
            articles.value = res.data.articles
            articles.value.forEach(item => {
                getUserInfoById(item.userinfoId).then(res => {
                    // item.userinfoId = res.data.userInfo.userName
                    item.userinfoId = res.data.userinfo.userName
                    item.createTime = formatDate(item.createTime)
                }).catch(err => {
                    console.log(err);
                })
            });
        } else {
            showCard.value = false
            console.log(res.msg);
        }

    }).catch(err => {
        console.log(err);
    })
}

/**
 * 获取所有文章分类
 */
onMounted(() => {
    getArticleCatAll().then(res => {
        articleCats.value = res.data.articleCats
        console.log(res.data.articleCats);
    }).catch(err => {
        console.log(err);
    })
})
/**
 * 获取所有文章
 */
onMounted(() => {
    // getArticlesByCateId().then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })

    toArticle(selectedId.value)
})

/**
 * 根据文章id获取文章详情
 * @param {*} id 
 */
const getArticleDetail = (id) => {
    console.log(id);
    $r.push({ path: '/articleDetail', query: { id: id } })
}



const bgColor = ref('white');

const setItem = (item) => {
    console.log(item.id);
    toArticle(item.id)
    drawer.value = false

}





</script>
<style scoped>
.box {
    display: flex;
    background-color: #e9e9eb;
}


.btn {
    margin-top: 10px;
    margin-left: 2px;
    width: 30px;
    height: 30px;
}

.el-button {
    width: 30px;
    height: 30px;
}

.scrollbar-flex-content {
    display: flex;
}

.scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 30px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: rgba(143, 153, 168, .3);
    color: #1e1b1b;
}

.el-drawer-flex-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.el-drawer-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: rgba(143, 153, 168, .3);
    color: #1e1b1b;
    width: 90px;
    height: 30px;
    margin: 10px;
    text-align: center;
}

.el-drawer__header {
    margin-bottom: 0px;
}

.el-scrollbar {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 90%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 100%;
}

.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 4px 0;
    /* margin-top: -1px; */
    border-top: 1px var(--el-border-color) var(--el-border-style);
}
</style>


