import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import store from './store/store'
import VueRouter from 'vue-router'
import { userUrl, getHeader } from './config'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: false,
  linkActiveClass: 'active',
  mode: 'history',

  routes : [

    /**
     * Login
     */
    {
      path: '/',
      component: require('./components/Login.vue'),
      name: 'login',
      meta: { requiresAuth: false },

      beforeEnter: (to, from, next) => {
        const _token = window.localStorage.getItem('id_token')

        if(_token !== '') {

          Vue.http.get(userUrl, {headers: getHeader()})
              .then((res) => {
                next({
                  path: '/painel',
                  query: { redirect: to.fullPath }
                })
              }, (res) => {
                next()
                console.log('A sessão expirou')
              })
        } else {
          next()
        }
      }
    },

    /**
     * Usuários
     */
    {
      path: '/painel',
      component: require('./components/users/Main.vue'),
      name: 'painel',

      children: [
        {
          path: '/usuarios',
          component: require('./components/users/Todos.vue'),
          name: 'usuarios',
          meta: { requiresAuth: true }
        },
        {
          path: '/novo/usuario',
          component: require('./components/users/Novo.vue'),
          name: 'novo_usuario',
          meta: { requiresAuth: true }
        },
        {
          path: '/bancas',
          component: require('./components/bancas/Todas.vue'),
          name: 'bancas',
          meta: { requiresAuth: true }
        },
        {
          path: '/nova/banca',
          component: require('./components/bancas/Nova.vue'),
          name: 'nova_banca',
          meta: { requiresAuth: true }
        },
        {
          path: '/bancas/validar',
          component: require('./components/bancas/ValidarBancas.vue'),
          name: 'validar_bancas',
          meta: { requiresAuth: true }
        },
        {
          path: '/novo/curso',
          component: require('./components/cursos/Novo.vue'),
          name: 'cursos',
          meta: { requiresAuth: true },
        },
        {
          path: '/professor',
          component: require('./components/users/HomeProfessor.vue'),
          name: 'professor'
        },
        {
          path: '/nova/bancas/enviadas',
          component: require('./components/bancas/BancasProfessor.vue'),
          name: 'bancas_enviadas',
          meta: { requiresAuth: true }
        }
      ]
    },

    /**
     * Padrão
     */
    {
      path: '*',
      redirect: '/'
    }

  ]
})

/**
 * Verifica se o token é válido para as rotas
 * que precisam de autenticação
 */
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    const _token = window.localStorage.getItem('id_token')

    if(_token !== '') {

      Vue.http.get(userUrl, {headers: getHeader()})
          .then((res) => {
            next()
          }, (res) => {
            next({
              path: '/',
              query: { redirect: to.fullPath }
            })
          })

    } else {

      next({
        path: '/',
        query: { redirect: to.fullPath }
      })

    }
  } else {
    next()
  }

})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
