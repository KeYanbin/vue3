<template>
  <div>
    <el-card class="box-card" v-for="article in articles" :key="article.id">
      <template #header>
        <div class="card-header">
          <span>{{ article.title }}</span>
          <el-button type="primary" @click="toRead(article)">阅读</el-button>
        </div>
      </template>
      <div class="text item">{{ article.content }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        { id: 1, title: '文章1', content: '这是文章1的内容', likes: 0 },
        { id: 2, title: '文章2', content: '这是文章2的内容', likes: 0 },
        { id: 3, title: '文章3', content: '这是文章3的内容', likes: 0 },
        { id: 4, title: '文章4', content: '这是文章4的内容', likes: 0 },
      ],
    };
  },
  methods: {
    toRead(article) {
      this.$router.replace({
        path: '/read',
        query : {
          id: article.id,
          title: article.title,
          content: article.content,
          likes: article.likes,
        }
      });
      
    },

  },
};
</script>
<style>
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
}</style>
