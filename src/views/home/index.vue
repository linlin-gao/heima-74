<template>
        <el-container class="home-container">
            <el-aside class="my-aside" :width="collapse?'64px':'200px'">
                                <!--  类名 collapse / 数据collapse -->
                <div class="logo" :class="{collapse:collapse}"></div>
                <el-menu
                    router
                    style="border-right:none"
                    :default-active="$route.path"
                    background-color="#002033"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="collapse"
                    :collapse-transition="false">
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/artice">
                        <i class="el-icon-document"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="/image">
                        <i class="el-icon-picture"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="/publish">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="/commebt">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="/fans">
                        <i class="el-icon-present"></i>
                        <span slot="title">粉丝管理</span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="my-header">
                    <span class="el-icon-s-fold" @click="toggleMenu()"></span>
                    <span class="text">江苏传智播客科技教育有限公司</span>
                    <el-dropdown style="float:right">
                        <span class="el-dropdown-link">
                            <img :src="avater" style="vertical-align:middle" width="30" height="30" alt="title">
                            <b style="vertical-align:middle; padding-left:15px">{{name}}</b>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" @command="handleCommand">
                            <el-dropdown-item icon="el-icon-setting" command="setting().native">个人设置</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-unlock" command="logout().native">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <!-- 身体部分 尚未完成 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      avater: '',
      name: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hm74-toutiao'))
    this.avater = user.photo
    this.name = user.name
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    // 1. 此时使用的是 click 事件 是一个DOM的原生事件
    // 2. 给一个自定义组件绑定原生事件
    // 3. 组件解析过 这个标签是不存在的 所以事件无效
    // 4. 使用事件修饰符: @click.prevent (.prevent是阻止浏览器默认行为/.native是绑定原生的事件)
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('hm74-toutiao')
      this.$router.push('/login')
    },
    handleCommand (command) {
      // command就是点击的选项中的command的值 setting/login
      this[command]()
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .my-aside{
        background: #002033;
        // 展开时的样式
        .logo{
            width: 100%;
            height: 60px;
            background: #024 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
        }
        // 折叠时的样式
        .collapse{
            background-image: url(../../assets/images/logo_admin_01.png);
            background-size: 36px auto;
        }
    }
    .my-header{
        border-bottom: 1px solid #ddd;
        line-height: 60px;
        .el-icon-s-fold{
            font-size: 26px;
            vertical-align: middle;
        }
        .text{
            vertical-align: middle;
            padding-left: 10px;
        }
    }
}
</style>
