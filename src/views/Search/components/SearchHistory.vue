<template>
  <div>
    <!-- 搜索历史的标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      @click="!isEdit && $emit('change-keywords', item)"
      v-for="item in histories"
      :key="item"
      :title="item"
    >
      <template #extra>
        <van-icon
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((value) => item !== value)
            )
          "
          name="close"
          v-show="isEdit"
        ></van-icon>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  },
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
