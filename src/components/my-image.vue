<template>
    <div class="image-container">
        <!-- 图片按钮 -->
        <div class="img-btn" @click="openDialog">
            <img :src="value||defaultImage" alt="">
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="700px">
            <!-- v-model="activeName" -->
            <!-- label="用户管理" 选项卡中的文字 -->
            <!-- el-tab-pane 标签的内容 就是选项卡对应的内容 -->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="素材库" name="image">
                    <!-- 单选框 -->
                    <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
                        <el-radio-button :label="false">全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                    </el-radio-group>
                    <!-- 图片列表 -->
                    <div style="margin-bottom:10px">
                        <div
                        class="img-item"
                        :class="{selected:selectedImageUrl===item.url}"
                        @click="selectedImage(item.url)"
                        v-for="item in images"
                        :key="item.id">
                            <img :src="item.url" alt="">
                        </div>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                    v-if="total>reqParams.per_page"
                    background
                    layout="prev,pager,next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="pager"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="upload">
                     <el-upload
                      class="avatar-uploader"
                      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                      :show-file-list="false"
                      :headers="headers"
                      name="image"
                      :on-success="handleSuccess">
                        <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer" @click="confirmImage">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 头部数据
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      },
      // 控制对话框显示/隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时 需要的传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片后预览地址
      uploadImageUrl: null,
      // 素材列表数据
      images: [],
      // 总条数
      total: 0,
      // 选中的素材的地址
      selectedImageUrl: null,
      // 你选中的图片 默认的是选中的图片的
      // 注意: webpack 不会去打包在数据中定义的地址对应的资源 webpack回去打包标签上的src或url的资源
      // 需要自己主动导入需要的图片的资源
      // 只有本地的资源不会去打包 如果是网络资源就OJBK
      //   value: defaultImage [临时使用的]
      defaultImage
    }
  },
  // 接收数据
  props: ['value'], // 该数据是只读的
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
      // 如果是素材 使用selectedImageUrl 作为封面图
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
      // 吐过是上传图片 使用 uploadImageUrl 作为封面图
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      // 思路 :class={selected: 条件}
      // 条件 点击时可以记录当前点击图片的唯一标识, 去对比每次遍历的图片的唯一标识
      // 如果一样 就选中添加selected样式 不一致则不选中
      // 此时 需要图片的地址作为唯一标识  将来提交的数据 是地址 不是id
      this.selectedImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style scoped lang="less">
.image-container {
  display: inline-block;
  margin-right: 20px;
}
.img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 10px;
    position: relative;
    &.selected{
        &::before{
            // 解析成css的时候 会解析成下面样式的选择器
            // .img-item.selected::before{} 加上selectedclass 就可以加上遮罩层
            content: "";
            position: absolute;
            left: 0;
            top:0;
            width:100%;
            height: 100%;
            background: rgba(0, 0, 0, .2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
        }
    }
    img{
        width: 100%;
        height: 100%;
        display: block;
        // CSS3属性 作用: 图片填充规则 等比例缩放 完整显示在容器内
        object-fit: contain;
    }
}
.img-btn{
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
