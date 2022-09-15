<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      class="search"
      v-model.trim="keywords"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @focus="isShowSearchResult = false"
      @cancel="$router.push('/')"
    />
    <!-- 历史 建议 结果 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <!-- 换一个高级写法 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'SearchPage',
  props: {},
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 去重1.获取没有去重的数组 2.放在new Set里面再解构
      // 这样写会有一个特点就是数组后的会被前面的同样的干掉这是set的特性
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>
<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
