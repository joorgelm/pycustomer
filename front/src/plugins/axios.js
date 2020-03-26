import axios from 'axios'

const ax = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

ax.interceptors.request.use((config) => {

  if (config.headers.Authorization == null && config.url !== '/auth/') {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user) {
      config.headers.Authorization = `Token ${user.token}`;
      return config
    }

    window.location = '/'
  }

  return config
});

export default ax