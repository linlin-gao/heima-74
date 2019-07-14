<template>
    <div class="article-container">
        <!-- 筛选区域 -->
        <el-card>
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-form :model="resParams">
                <el-form-item label="状态:">
                    <el-radio-group v-model="resParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道:">
                    <el-select v-model="resParams.channel_id" placeholder="请选择">
                        <el-potion
                        v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"></el-potion>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期:">
                    <el-date-picker
                    v-model="dateValues"
                    type="daterange"
                    range-separator="至"
                    start-placeholde="开始日期"
                    end-placeholde="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left: 43px">
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 结果区域 -->
        <el-card></el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
    // 提交给后台的筛选条件数据
      resParams: {
        // 默认数据 '' 和 null 的区别
        // 如果是 null 该字段不会提交给后台
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的选项数组
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dateValues: []
    }
  }
}
</script>

<style scoped lang='less'>
    // element-ui提供的组件 在解析完毕后 会在当前标签上加上一个和组件的名称一致的class
    .el-card{
        margin-bottom: 20px;
    }
</style>
