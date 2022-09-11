import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      storage: window.localStorage,
      reducer({ tokenObject }) {
        return { tokenObject }
      }
    })
  ],
  state: {
    tokenObject: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObject.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.tokenObject = token
    }
  },
  actions: {},
  modules: {}
})
