import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      storage: window.localStorage,
      reducer({ tokenObject, myChannels, histories }) {
        return { tokenObject, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObject: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObject.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.tokenObject = token
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },

    /**
     *
     * @param {*} histories 删除或者添加以后的新的搜索历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
