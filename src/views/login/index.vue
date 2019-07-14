<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox checked>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const checkMobile = (rule, value, callback) => {
  if (/^1[3-9]\d{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('手机号码格式不正确'))
  }
}
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http.post(
            // axios 是基于promise来封装的post()返回一个promise对象
            'authorizations',
            this.loginForm
          ).then(res => {
            // res 是响应对象 包含里 后台返回的数据 res.data
            console.log(res.data)
            // 登陆成功之后做的事:
            // 1 跳转至首页
            // 2 保存用户信息 用来判断登陆的状态
            // sessionStorage 是Bom对象 全局对象 作用是保存数据
            // 是有 有效期的 关闭浏览器后就会失效
            // sessionStorage.setItem(ket, value) value必须是字符串
            // sessionStorage.getItem(ket) 获取数据
            // sessionStorage.romoveItem(ket) 删除数据
            // sessionStorage.clear() 清空所有的数据
            window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          }).catch(() => {
            // 这里需要提示错误信息
            this.$message.error('出大事了!!!')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* cover 铺满容器 多余的裁剪 contain 在容器内完全显示图片 */
  /* center / cover : '背景图定位/背景图尺寸' */
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 300px;
      margin: 10px auto;
    }
  }
}
</style>
