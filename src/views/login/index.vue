<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码按钮 -->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            @click="sendCode"
            class="btn"
            round
            type="default"
            size="small"
            native-type="button"
            >获取验证码</van-button
          >
          <!-- 倒计时 -->
          <van-count-down
            v-else
            :time="10 * 1000"
            format="ss 秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { mobileRules, codeRules } from './rules'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  props: {},
  components: {},
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  computed: {},
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    ...mapMutations(['setToken']),
    loading() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login({
          mobile: this.mobile,
          code: this.code
        })
        console.log(data)
        // 先跳转，再提示
        this.$router.push('/profile')
        this.$toast.success('登录成功')
        this.setToken(data.data)
      } catch (error) {
        /**
         * 这里的登录失败有很多情况
         */
        console.log(error)
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.van-form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
  .btn {
    background-color: #eee;
    color: #a58594;
    height: 0.64rem;
  }
}
</style>
