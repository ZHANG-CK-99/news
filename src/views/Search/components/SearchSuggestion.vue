<template>
  <div>
    <van-cell
      v-for="(item, index) in hightLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串(可以是变量表示),修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
// - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  name: 'SearchSuggestion',
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  components: {},
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    hightLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>
<style scoped lang="less"></style>
