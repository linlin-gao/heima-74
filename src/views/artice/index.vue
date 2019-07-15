<template>
    <div class="artice-container">
        <!-- 筛选区域 -->
        <el-card>
            <div slot="header">
                <my-bread>内容区域</my-bread>
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
                        <el-option
                        v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期:">
                    <el-date-picker
                    value-format="yyyy-MM-dd"
                    @change="changeDate"
                    v-model="dateValues"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left: 43px">
                    <el-button type="primary" @click="search">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 结果区域 -->
        <el-card>
            <div slot="header">
                根据筛选条件共查询到 <b>{{total}}</b>条结果：
                <template :data="articles">
                    <el-table-column label="封面">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px" alt="">
                                <div slot="error" class="image-slot">
                                    <img src="../../assets/images/error.gif" width="100" height="75" alt="">
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="标题" prop="title"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
                            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
                            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
                            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.id)" icon="el-icon-edit" plain type="primary" circle></el-button>
                            <el-button @click="del(scope.row.id)" icon="el-icon-delete" plain type="danger" circle></el-button>
                        </template>
                    </el-table-column>
                </template>
                <div class="box">
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="pager"
                    :current-page="reqParams.page"
                    :page-size="reqParams.per_page"
                    :total="total"
                    ></el-pagination>
                </div>
            </div>
        </el-card>
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
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的选项数组
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 编辑
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除
    del (id) {
      this.$confirm('此操作会永久删除 是否继续', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    // 分页
    pager (newPager) {
      // 提交当前页码给后台 才能获取对应的数据
      this.reqRarams.page = newPager
      this.getArticles()
    },
    // 搜索
    search () {
      this.articles()
    },
    // 选择时间处理函数
    changeDate (values) {
      this.resParams.begin_pubdate = values[0]
      this.resParams.end_pubdate = values[1]
    },
    // 获取频道数据
    async getChannelOptions () {
      // res ===> {data: 响应内容} ===> {data: {data: {channels:[{id,name},...]}}}
      // 解构赋值 const {data} = res
      // 解构赋值 const { data: {data} } = res
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      // post 传参 :post('url', {参数对象})
      // get 传参 :get('url?key=value&....') / get('url', {params:{参数对象}})
      const { data: { data } } = await this.$http.get('articles', { params: this.resParams })
      this.articles = data.results
    }
  }
}
</script>

<style scoped lang='less'>
    // element-ui提供的组件 在解析完毕后 会在当前标签上加上一个和组件的名称一致的class
    .el-card{
        margin-bottom: 20px;
    }
    .box{
        text-align: center;
        margin-top: 20px;
    }
</style>
