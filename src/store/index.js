import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObject: {}
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.tokenObject = token
    }
  },
  actions: {},
  modules: {}
})
