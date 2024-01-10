<template>
    <div class="box">
        <el-card class="box-card" shadow="never" v-for="article in articles" :key="article.id">
            <template #header>
                <div class="card-header">
                    <span>{{ article.title }}</span>
                    <el-button type="primary" @click="Add(article)">点赞{{ article.likes }}</el-button>
                </div>
            </template>
            <div class="text item">{{ article.content }}</div>
        </el-card>
    </div>
</template>

<script >
export default {
    data() {
        return {
            articles: []
        };
    },
    methods: {
        Add(data){
            data.likes++
        }
    },
    created() {

        let arr = [{
            id: this.$route.query.id,
            title: this.$route.query.title,
            content: this.$route.query.content,
            likes: this.$route.query.likes
        }]
        this.articles = arr
    }
};
</script>

<style>
#app{
    padding: 0;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.box-card {
    width: 100%;
    margin-bottom: 5px;
}
</style>
