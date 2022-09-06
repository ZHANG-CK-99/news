<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
.box {
  width: 2rem;
  height: 2rem;
  background: red;
}
</style>
