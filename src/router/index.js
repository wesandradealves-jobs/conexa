import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'

const login = resolve => require(["@/views/login/login.vue"], resolve)
const dashboard = resolve => require(["@/views/dashboard/dashboard.vue"], resolve)
const home = resolve => require(["@/views/dashboard/_partials/home/home.vue"], resolve)
const escolha = resolve => require(["@/views/dashboard/_partials/escolha/escolha.vue"], resolve)
const perfil = resolve => require(["@/views/dashboard/_partials/perfil/perfil.vue"], resolve)
const duvidas = resolve => require(["@/views/dashboard/_partials/duvidas/duvidas.vue"], resolve)
const meusAtendimentos = resolve => require(["@/views/dashboard/_partials/meusAtendimentos/meusAtendimentos.vue"], resolve)
const atendimento = resolve => require(["@/views/dashboard/_partials/atendimento/atendimento.vue"], resolve)
const sintomas = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/sintomas/sintomas.vue"], resolve)
const medicamentos = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/medicamentos/medicamentos.vue"], resolve)
const anexos = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/anexos/anexos.vue"], resolve)
const preferencia = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/preferencia/preferencia.vue"], resolve)
const especialidades = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/especialidades/especialidades.vue"], resolve)
const buscaProfissional = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/buscaProfissional/buscaProfissional.vue"], resolve)
const profissional = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/profissional/profissional.vue"], resolve)
const agendamento = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/agendamento/agendamento.vue"], resolve)
const chamada = resolve => require(["@/views/dashboard/_partials/atendimento/_partials/chamada/chamada.vue"], resolve)
const PageNotFound = resolve => require(["@/views/PageNotFound/PageNotFound.vue"], resolve)

Vue.use(Router)

let routes = [
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      title: 'Plataforma Conexa - Página não encontrada',
      protected: false
    }
  },
  {
    path: "/",
    redirect: "/login"
  }, 
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: 'Plataforma Conexa - Faça seu login',
      protected: false
    },
    props: true,
    children: [
      {
          path: "/esqueci-senha",
          name: "esqueci-senha",
          meta: {
            title: 'Plataforma Conexa - Esqueci a senha',
            protected: false
          },
          props: true
      }
    ]
  }, 
  {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/home",
    component: dashboard,
    meta: {
      protected: true
    },
    props: true,
    children: [
      {
          path: "/atendimento",
          name: "atendimento",
          component: atendimento,
          meta: {
            protected: true
          },
          props: true, 
          children: [
            {
                path: "/atendimento/chamada",
                name: "chamadaAtendimento",
                component: chamada,
                meta: {
                  title: 'Plataforma Conexa | Chamada em andamento',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },
                    {
                        path: "/meus-atendimentos",
                        name: "Meus atendimentos",
                    },                     
                  ] 
                },
                props: true
            },              
            {
                path: "/atendimento-agendado/agendamento-sem-preferencia",
                name: "agendamento",
                component: agendamento,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Agendado | Escolha uma data para o atendimento',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },                  
                    {
                        path: "/atendimento-agendado/preferencia",
                        name: "Preferência",
                    }                      
                  ]  
                },
                props: true
            },            
            {
                path: "/atendimento-agendado/profissional/:idProfissional",
                name: "profissional",
                component: profissional,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Agendado | ',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },                  
                    {
                        path: "/atendimento-agendado/preferencia",
                        name: "Preferência",
                    },                  
                    {
                        path: "/atendimento-agendado/preferencia/busca-profissional",
                        name: "Busca",
                    }                      
                  ]  
                },
                props: true
            },          
            {
                path: "/atendimento-agendado/preferencia/busca-profissional/:idEspecialidade",
                name: "busca-nome",
                component: buscaProfissional,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Agendado | Busca por especialidade',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },                  
                    {
                        path: "/atendimento-agendado/preferencia",
                        name: "Preferência",
                    }                      
                  ]  
                },
                props: true
            },           
            {
                path: "/atendimento-agendado/preferencia/busca-profissional",
                name: "busca-nome",
                component: buscaProfissional,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Agendado | Busca pelo nome do profissional',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },                  
                    {
                        path: "/atendimento-agendado/preferencia",
                        name: "Preferência",
                    }                      
                  ]  
                },
                props: true
            },            
            {
                path: "/atendimento-agendado/preferencia/especialidades",
                name: "especialidades",
                component: especialidades,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Agendado | Especialidade',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },                  
                    {
                        path: "/atendimento-agendado/preferencia",
                        name: "Preferência",
                    }                      
                  ]  
                },
                props: true
            },            
            {
                path: "/atendimento-agendado/preferencia",
                name: "preferencia",
                component: preferencia,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Agendado | Preferência',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    }                      
                  ]  
                },
                props: true
            },          
            {
                path: "/atendimento-imediato/anexos",
                name: "anexos",
                component: anexos,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Imediato | Anexos',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },
                    {
                        path: "/atendimento-imediato/sintomas",
                        name: "Sintomas"
                    },
                    {
                        path: "/atendimento-imediato/medicamentos",
                        name: "Medicamentos"
                    }                         
                  ]  
                },
                props: true
            },             
            {
                path: "/atendimento-imediato/medicamentos",
                name: "medicamentos",
                component: medicamentos,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Imediato | Medicamentos',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início",
                    },
                    {
                        path: "/atendimento-imediato/sintomas",
                        name: "Sintomas"
                    }                        
                  ]                  
                },
                props: true
            },          
            {
                path: "/atendimento-imediato/sintomas",
                name: "sintomas",
                component: sintomas,
                meta: {
                  title: 'Plataforma Conexa - Atendimento Imediato | Sintomas',
                  protected: true,
                  setHeader: true,
                  breadcrumb: [
                    {
                        path: "/home",
                        name: "Início"
                    }   
                  ]
                },
                props: true
            }            
          ]
      },      
      {
          path: "/meus-atendimentos",
          name: "meus-atendimentos",
          component: meusAtendimentos,
          meta: {
            title: 'Plataforma Conexa - Meus Atendimentos',
            protected: true,
            setHeader: true
          },
          props: true
      },         
      {
          path: "/duvidas",
          name: "duvidas",
          component: duvidas,
          meta: {
            title: 'Plataforma Conexa - Dúvidas',
            protected: true,
            setHeader: true
          },
          props: true
      },      
      {
          path: "/perfil",
          name: "perfil",
          component: perfil,
          meta: {
            title: 'Plataforma Conexa - Perfil',
            protected: true,
            setHeader: true
          },
          props: true
      },    
      {
          path: "/escolha",
          name: "escolha",
          component: escolha,
          meta: {
            title: 'Plataforma Conexa - Escolha a clínica, hospital ou convênio.',
            protected: true,
            setHeader: false
          },
          props: true
      },
      {
          path: "/home",
          name: "inicio",
          component: home,
          meta: {
            title: 'Plataforma Conexa - Página Inicial',
            protected: true,
            setHeader: true
          },
          props: true
      }      
    ]
  }
]

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "current",
  routes: routes
})

router.beforeResolve((to, from, next) => {  
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  )
  NProgress.start()

  let token = (to.params.token) ? to.params.token : sessionStorage.getItem('token')
  let users = (to.params.users) ? to.params.users : sessionStorage.getItem('users')
  let user = (to.params.user) ? to.params.user : sessionStorage.getItem('user')

  if(to.meta.protected) {
    if(!users) {
      next('/login')
    } else if(!token) {
      if(to.name !== 'escolha') {
        next('/escolha')
      }      
    } else {
      if(to.name === 'escolha') {
        next('/home')
      }
    }  
  } else {
    if(token && to.name !== 'PageNotFound' || users) {
      next('/home')
    }
  }
  next()
})

router.afterEach((to, from) => {
  window.scrollTo( 0, 0 )
  NProgress.done()
})

export default router