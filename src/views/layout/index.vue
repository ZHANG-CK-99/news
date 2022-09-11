<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <van-tabbar class="tabbar" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="title">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="title">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
          <span class="title">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="title">{{ isLogin ? '我的' : '未登录' }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  }
  .toutiao {
    font-size: 40px;
  }
  .title {
    font-size: 30px;
  }
}
</style>
