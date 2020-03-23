import axios from 'axios'

const ax = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

function refreshToken (token) {
  return axios({
    method: 'post',
    url: '/api/atendente/refresh',
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(resolve => resolve.data)
}

function checkUrl (url) {
  let allowed = ['check', 'create', 'melhorias', 'auth', 'nova_senha']

  for (let index = 0; index < allowed.length; index++) {
    if (url.includes(allowed[index])) {
      return true
    }
  }

  return false
}

ax.interceptors.request.use((config) => {
  let atendente = JSON.parse(window.localStorage.getItem('atendente'))

  if (atendente) {
    const hour = 3600
    const halfHour = 1800
    let now = Math.floor(Date.now() / 1000)
    let period = now - atendente.timestamp // periodo em segundos

    if (period > hour) {
      window.localStorage.removeItem('atendente')
      window.location = '/'
    } else if (period > halfHour) {
      return refreshToken(atendente.access_token)
        .then(({ data }) => {
          window.localStorage.removeItem('atendente')

          data.timestamp = now

          window.localStorage.setItem('atendente', JSON.stringify(data))
          config.headers.Authorization = `Bearer ${data.access_token}`

          return config
        })
        .catch(() => {
          window.localStorage.removeItem('atendente')
          window.location = '/'
        })
    } else {
      config.headers.Authorization = `Bearer ${atendente.access_token}`
      return config
    }
  } else {
    if (checkUrl(config.url)) {
      return config
    }

    window.location = '/'
  }

  return config
})

export default ax
