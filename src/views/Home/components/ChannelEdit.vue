<template>
  <div class="channel-edit">
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(value, index) in myChannels"
          :key="value.id"
          :class="{ active: value.name === '推荐' }"
          :text="value.name"
          :icon="isEdit && value.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(value, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道标题 -->
    <van-cell title="推荐频道"></van-cell>
    <!-- 推荐频道 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="value in recommendChannels"
          :key="value.id"
          :text="value.name"
          icon="plus"
          @click="$emit('add-channel', value)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import { getAllChannelAPI } from '@/api'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: Array
  },
  components: {},
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    /**
     * Returns Array
     * 这里采用的是全部的减去我的
     */
    recommendChannels() {
      return this.allChannels.filter((allChannelItem) => {
        // 这里面就是进行逻辑。首先采用fing方法去myChannels里面找有没有一样的
        return !this.myChannels.find((myChannels) => {
          return myChannels.id === allChannelItem.id
        })
      })
    }
  },
  // 生命周期 - 创建完成(访问当前this实例)
  created() {
    this.getAllChannel()
  },
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('del-channel', id)
      } else {
        // 关闭弹窗
        // 切换频道
        this.$emit('change-active', index)
      }
    }
  }
}
</script>
<style scoped lang="less">
.channel-edit {
  padding-top: 92px;
  :deep(.active) {
    .van-grid-item__text {
      color: red;
    }
  }
  :deep(.btn) {
    width: 100px;
    font-size: 25px;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  // 我的频道
  .my-pannel {
    // 编辑按钮居中
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    // 关闭按钮样式
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__content {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  :deep(.van-icon-cross) {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    transform: translate(20%, -35%);
    border: 0.02667rem solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
  }
  // 推荐频道
  .recommend-pannel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.3rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
