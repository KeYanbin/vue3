<template>
    <div style="width: 100%;">
        <el-page-header @back="handleBack">
            <template #icon>
                <el-icon size="20">
                    <ArrowLeftBold />
                </el-icon>
            </template>
            <template #title>
                <div style="width: 35px;">
                    <el-text class="mx-1" size="large">返回</el-text>
                </div>
            </template>
            <template #content>
                <div class="title" style="width: 200opx;" :style="customStyle">
                    <el-text class=" font-600 mr-3" size="20" truncated>{{ title }}</el-text>
                </div>
            </template>
        </el-page-header>
        <el-divider />
    </div>
</template>
<script >
import { ArrowLeftBold } from '@element-plus/icons-vue'
export default {
    name: 'KHeader',
    props: {
        title: {
            type: String,
            required: true
        },
        customStyle: Object
    },
    methods: {
        handleBack() {
            this.$emit('handleBack');
        }
    }
}
</script>
<style scoped>
.el-page-header {
    margin-top: 5px;
}

.el-divider--horizontal {
    margin: 10px 0;
}

.title {
    width: 200px;
    margin-top: 4px;
}
</style>