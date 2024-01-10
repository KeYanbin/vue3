<template>
  <kHeader title="个人信息" @handleBack="handleBack" :customStyle="headerStyle" />
  <div class="userinfo">
    <div class="box">
      <div class="user_img">
        <el-avatar :size="100" :src="data.url" />
        <!-- <ElImage :src="data.url" /> -->
      </div>
      <div class="btn">
        <div><el-button>关注</el-button></div>
        <div><el-button>动态</el-button></div>
        <div><el-button>收藏</el-button></div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import kHeader from "../../components/k-header.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'

// 2. 调用useRouter函数
const router = useRouter();
const data = reactive({
  url: "https://springboot-web-image.oss-cn-fuzhou.aliyuncs.com/touxiang.jpg",
});

const headerStyle = {
  display: 'flex',
  'justify-content': 'space-around'
}

const handleBack = () => {
  console.log('返回');
  router.back();

}

</script>
  
<style  scoped>
.userinfo {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>