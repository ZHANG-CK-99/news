<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoding" @refresh="getNextPageArticle">
      <van-list
        :finished="finished"
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          :article="item"
          v-for="item in articles"
          :key="item.art_id"
        ></article-item>
      </van-list>
    </van-pull-refresh>
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
      articles: [],
      loading: false,
      preTimeStamp: '',
      finished: false,
      error: false,
      refreshLoding: false
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
        this.preTimeStamp = data.data.pre_timestamp
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
    },
    async getNextPageArticle() {
      try {
        // if (Math.random() > 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticles(this.id, this.preTimeStamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }

        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoding = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
