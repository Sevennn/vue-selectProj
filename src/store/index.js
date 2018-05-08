import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        updateselect : [],
        role: null,
        token: ``
    },
    mutations: {
        getupdate (state, data) {
            state.updateselect = data
        },
        SetTokenRole(state,t) {
            state.role = t.role
            state.token = t.token
        }
    }
  })
  export default store;