import Vue from 'vue'
import Vuex from 'vuex'
import Storage from './models/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Storage
  }
})
