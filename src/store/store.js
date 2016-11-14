import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})