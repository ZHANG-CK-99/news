<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    >
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
        />
      </template>
    </van-cell>
  </div>
</template>
<script>
import dayjs from '@/utils/day.js'
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    label() {
      /* eslint-disable*/
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  },
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
