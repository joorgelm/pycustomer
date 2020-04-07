export default {
    state: {
        notification: null
    },
    mutations: {
        setNotification (state, notification) {
            state.notification = notification
        }
    },
    actions: {
        showErrorMessage({ commit }, msg) {
            commit('setNotification', {
                text: msg,
                show: true,
                color: 'error'
            })
        },
        clearNotification({ commit }) {
            commit('setNotification', {
                text: '',
                show: false,
                color: 'error'
            })
        }
    },
    getters: {
        getNotification: (state) => {
            return state.notification
        }
    }
}