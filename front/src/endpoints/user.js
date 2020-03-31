import http from '@/plugins/axios.js'

export default {
    login (params) {
        return http.post('/auth/', params)
    },
    create (params) {
        return http.post('/user/', params)
    }
}