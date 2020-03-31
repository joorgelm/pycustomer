import userAPI from '@/endpoints/user'

export default {
    state: {
        user: getSavedState('user')
    },
    mutations: {
        setUser (state, user) {
            state.user = user
            saveState('user', state)
        }
    },
    actions: {
        login ({ commit }, data = null){
            return userAPI.login(data).then(res => {
                commit('setUser', res.data)
            })
        },
        logout ({ commit }){
            commit('setUser', null)
        },
        sign ({ commit }, data = null){
            return userAPI.create(data).then(res => {
                commit('setUser', res.data)
            })
        }
    },
    getters: {

    }
}

function getSavedState (key) {
    return JSON.parse(window.localStorage.getItem(key))
}

function saveState (key, state) {
    state['timestamp'] = Math.floor(Date.now() / 1000)
    window.localStorage.setItem(key, JSON.stringify(state))
}
