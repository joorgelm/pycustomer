export default {
    state: {
        notification: null,
        loading: {
            visible: false,
            text: 'Carregando'
        }
    },
    mutations: {
        setNotification (state, notification) {
            state.notification = notification
        },
        setLoading (state, loading) {
            console.log('OPA')
            if (loading.text) {
                state.loading = loading
            } else {
                state.loading.visible = loading.visible
                state.loading.text = 'Carregando'
            }
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
        },
        showLoading({ commit }, text) {
            commit('setLoading', {
                visible: true,
                text: text
            })
        },
        hideLoading({ commit }) {
            commit('setLoading', { visible: false })
        }
    },
    getters: {
        getNotification: (state) => {
            return state.notification
        },
        getLoadingStatus: (state) => {
            return state.loading
        }
    }
}