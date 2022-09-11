<template>
  <div>
    <article-item
      :article="item"
      v-for="item in articles"
      :key="item.art_id"
    ></article-item>
  </div>
</template>
<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  components: { ArticleItem },
  data() {
    return {
      articles: []
    }
  },
  computed: {},
  // 生命周期 - 创建完成(访问当前this实例)
  created() {
    this.getFirstPageArticle()
  },
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
      } catch (error) {
        // js的错误，上抛。507原封不动的 400 上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
