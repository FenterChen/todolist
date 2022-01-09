import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alllist: '',
  },
  mutations: {
    setlist(state, payload) {
      state.alllist = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
