import axios from 'axios'
import router from '../router'

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

export default ax