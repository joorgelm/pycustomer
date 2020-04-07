import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/user'
import application from './modules/application/application'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        application
    }
})