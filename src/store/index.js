import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        updateselect : []
    },
    mutations: {
        getupdate (state, data) {
            state.updateselect = data
        }
    }
  })
  export default store;