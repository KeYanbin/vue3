<template>
    <div>
        <el-card class="box-card" v-for="item in articles" :key="item.id" v-if="showCard"
            @click="getArticleDetail(item.id)">
            <template #header>
                <div class="card-header">
                    <span style="display: flex;align-items: center;"> <el-icon>
                            <Avatar />
                        </el-icon> &nbsp;{{ item.userinfoId }}</span>
                    <span style="display: flex;align-items: center;"><el-icon>
                            <Timer />
                        </el-icon> &nbsp;{{ item.createTime }}</span>
                </div>
            </template>
            <div class="text item">
                {{ item.title }}
            </div>
        </el-card>

        <div v-else>
            <el-empty :image-size="200" description="没有数据" />
        </div>
    </div>



</template>

<script>
export default {
    props: {
        articles: {
            type: Array,
            required: true
        },
        showCard: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        getArticleDetail(id) {
            this.$emit('getArticleDetail', id);
        }
    }
}
</script>