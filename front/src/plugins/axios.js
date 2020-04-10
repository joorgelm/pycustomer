import axios from 'axios'
import router from '../router'
import store from '../store/store'

const ax = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
})

ax.interceptors.request.use((config) => {

    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user) {

        const hour = 3600

        const now = Math.floor(Date.now() / 1000)
        const period = now - user.timestamp

        if (period > hour) {
            window.localStorage.removeItem('user')
            // todo: dispara alert orientando usuario
            router.push('login')
        } else {
            user.timestamp = now
            window.localStorage.setItem('user', JSON.stringify(user))
            config.headers.Authorization = `Token ${user.token}`
            return config
        }
    }

    return config

})

ax.interceptors.response.use(res => {
    return res
},err => {
    store.dispatch('hideLoading')
    store.dispatch('showErrorMessage', err.response.data.message)
    return Promise.reject(err)
})

export default ax