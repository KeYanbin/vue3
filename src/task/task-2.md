### 任务二：

```
使用弹性布局，创建一个左右固定的div,中间div宽度自适应
```

 代码：

```vue
<template>
  <div class="flex">
    <div class="box1">1</div>
    <div class="box2">2</div>
    <div class="box3">3</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: flex-start;
}
.box1 {
  flex-basis: 200px;
  height: 99vh;
  border:1px solid red;
}
.box2 {
 
  flex-grow: 1;
  height: 99vh;
  border:1px solid yellow;

}
.box3 {
  flex-basis: 200px;
  height: 99vh;
  border:1px solid green;
}
</style>
```

效果图:

![](https://gitee.com/kecm/vue3-demo/raw/master/src/task/img/%E4%BB%BB%E5%8A%A12-1.png)

![](https://gitee.com/kecm/vue3-demo/raw/master/src/task/img/%E4%BB%BB%E5%8A%A12-2.png)

