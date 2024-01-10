<template>
    <kHeader :title="article.title" @handleBack="handleBack" />
    <el-text>{{article.content}}</el-text>
</template>
  
<script  setup>
import { onMounted, ref } from 'vue';
import kHeader from '../../components/k-header.vue';
import { getArticleContentById } from '../../http/article';
// 1. 引入useRouter 或 useRoute
import { useRoute,useRouter } from 'vue-router'

// 2. 调用useRouter函数
const $r = useRoute();
const router = useRouter();
const article = ref({});
const handleBack = () => {
    console.log('返回');
    router.back();

}

onMounted(() => {
    const id = $r.query.id;

    getArticleContentById(id).then(res => {
        console.log(res);
        if (res.code == 1) {
            article.value = res.data.article;
        }
    }).catch(err => {
        console.log(err);
    })

})
</script>