任务一： 
    主页显示文章列表，每篇文章可以被阅读，阅读后可以点赞，点赞数初始为0;
    并把代码上传到gitee或者github代码库进行管理。

1. 实验步骤

   1. ```vue
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
      ```

      

   2. ```vue
      
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
      
      ```

截图

![image-20230922212931429](https://gitee.com/kecm/vue3-demo/raw/master/src/task/img/%E4%BB%BB%E5%8A%A11-1.png)

![image-20230922212948186](https://gitee.com/kecm/vue3-demo/raw/master/src/task/img/%E4%BB%BB%E5%8A%A11-2.png)