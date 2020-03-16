import Vue from 'vue'
import Router from 'vue-router'

// Import Layouts
import Admin from './layouts/Admin/Admin.vue'
import Dashboard from './layouts/Dashboard/Dashboard.vue'
import Login from './layouts/Login/Login'

// Import Pages
import Cadastro from './pages/CadastroSatisfacao/Cadastro.vue'
import CadastroAtendentes from './pages/CadastroAtendente/CadastroAtendentes.vue'
import Avaliacao from './pages/Avaliacao/Avaliacao.vue'
import Satisfacao from './pages/Satisfacao/Satisfacao.vue'
import Erro from './pages/Erro/Erro.vue'
import Final from './pages/Final/Final.vue'
import ResetPassword from './pages/ResetPassword/ResetPassword'

// Import Component
import CadastroList from './components/Cadastro/CadastroList.vue'
import Detalhe from './components/ListagemSatisfacao/Detalhe.vue'

Vue.use(Router)

const beRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Admin,
      redirect: { path: '/dashboard', component: Dashboard },
      children: [
        // this is also a route record
        { path: 'dashboard', component: Dashboard },
        { path: 'cadastro', component: Cadastro },
        { name: 'cadastro-atendentes', path: 'cadastroatendentes', component: CadastroAtendentes },
        { name: 'cadastro-listagem', path: 'cadastro/listagem', component: CadastroList },
        { path: 'listagem', component: Satisfacao },
        { name: 'detalhe', path: 'listagem/detalhe', component: Detalhe }
      ]
    },
    {
      path: '/nova-senha/:hash',
      name: 'novaSenha',
      component: ResetPassword
    },

    // Redirects
    {
      path: '/dashboard',
      redirect: { path: '/home/dashboard', component: Dashboard }
    },
    {
      path: '/cadastro',
      redirect: { path: '/home/cadastro', component: Cadastro }
    },
    {
      path: '/listagem',
      redirect:
        { path: '/home/listagem', component: Satisfacao }
    },
    {
      name: 'erro',
      path: '/erro',
      component: Erro
    },
    {
      name: 'final',
      path: '/final',
      component: Final
    },
    {
      name: 'pesquisa',
      path: '/pesquisa',
      component: Avaliacao,
      children: [
        {
          path: '/*',
          component: Avaliacao
        }
      ]
    },

    { path: '*', redirect: '/' }
  ]
})

function checkPath (path) {
  if (path === '/') return true

  const allowed = ['pesquisa', 'final', 'erro', 'nova-senha']

  for (let index = 0; index < allowed.length; index++) {
    const element = allowed[index]
    if (path.includes(element)) return true
  }

  return false
}

beRouter.beforeEach((to, from, next) => {
  if (!window.localStorage.getItem('atendente')) {
    if (!checkPath(to.path)) {
      next({ path: '/' })
    }
  } else {
    if (to.path === '/') {
      next({ path: '/home' })
    }
  }
  next()
})

export default beRouter
