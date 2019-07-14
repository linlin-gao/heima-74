// 封装一个vue的插件  完成当前文件夹下的所有的组件全局注册

// 当导入这个模块 我们使用Vue.use(使用这个模块) Vue会调用install函数 还会默认传入Vue对象
import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    // 使用Vue对象去做你需要做的事即可
    // 进行组件的注册
    Vue.component(MyBread.name, MyBread)
    // 更多组件时 只需要在下面进行注册即可
  }
}
