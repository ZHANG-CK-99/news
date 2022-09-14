import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      storage: window.localStorage,
      reducer({ tokenObject, myChannels }) {
        return { tokenObject, myChannels }
      }
    })
  ],
  state: {
    tokenObject: {},
    myChannels: []
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
    }
  },
  actions: {},
  modules: {}
})
