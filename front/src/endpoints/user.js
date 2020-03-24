import http from '@/plugins/axios.js'

export default {
    login (params) {
        return http.post(`/auth/`, params)
    }
}