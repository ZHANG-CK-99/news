<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败,点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>
<script>
import { getResultsAPI } from '@/api'
export default {
  name: '',
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  computed: {},
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    async getResults() {
      try {
        const {
          data: {
            data: { results }
          }
        } = await getResultsAPI(this.page++, this.perPage, this.keywords)

        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
