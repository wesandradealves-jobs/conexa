import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'nprogress'
import router from '@/router'

Vue.use(Vuex, VueAxios, axios)

export default new Vuex.Store({
  state: {
    watcher: {
      chamada: false,
      atendimento: false,
      interval: null,
      status: false,
      type: '',
      class: '',
      content: {
        msg: '',
        path: '',
        img: ''
      }
    },
  	modal: {
	  	isModal: false,
	  	modalContent: {
	  		title: '',
	  		text: ''
	  	}
  	},
    isAceitaTermo: false,
    urlFoto: '' 
  },
  mutations: {
    modal(state, data){
    	state.modal.isModal = !state.modal.isModal
    	state.modal.modalContent.title = data.title
    	state.modal.modalContent.text = data.text
    },
    aceitaTermo(state, bool) {
      state.isAceitaTermo = bool
    },
    logout(state, bool) {
      var users = sessionStorage.getItem('users')

      clearInterval(state.watcher.interval)

      $cookies.remove('token')
      $cookies.remove('user')
      $cookies.remove('services')
      sessionStorage.clear()
      localStorage.clear()

      if(bool) {
        sessionStorage.setItem('users', users)
      }
      
      router.push({ name: (bool) ? 'escolha' : 'login' }).catch(err => { return false })
    }    	
  },  
  actions: {
    _clearWatcher({state}) {
      state.watcher.chamada = state.watcher.atendimento = state.watcher.status = false
      state.watcher.content.img = state.watcher.content.msg = state.watcher.class = state.watcher.type = null   

      sessionStorage.removeItem('idProtocolo')
      
      clearInterval(state.watcher.interval) 

      // router.replace('/home').catch(err => { return false })  
    },    
    _setWatcher({dispatch, state, getters, commit}, body) {
      var self = this

      let chamada = false 
      let atendimento = false

      function getAtendimentoImediato() {
        dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/atendimento/imediato/ativo`, 
          token: body.token,
          silent: true
        }).then(response => {
          if(response.data.object !== null && !state.watcher.chamada) {
            state.watcher.atendimento = state.watcher.status = true
            state.watcher.type = 'atendimento'
            state.watcher.class = 'warning'
            state.watcher.content.msg = `Estamos selecionando um(a) ${response.data.object.tipoProfissional}. <small>Previsão de atendimento: ${response.data.object.horaPrevistaAtendimento}</small>`
            state.watcher.content.img = 'https://cdn3.iconfinder.com/data/icons/doctor-icons/100/01-1Doctor-512.png'

            sessionStorage.setItem('idProtocolo', response.data.object.idProtocolo)
          }
        }, error => {
          reject(error)
        }) 
      } 

      function getChamadaAtiva() {
        dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/atendimento/chamada/ativa`, 
          token: body.token,
          silent: true
        }).then(response => {
          if(response.status === 200 &&
              response.data.object !== null && 
              !state.watcher.atendimento) {
              state.watcher.chamada = state.watcher.status = true
              state.watcher.type = 'chamada'
              state.watcher.class = 'active'
              state.watcher.content.msg = `${response.data.object.nomeProfissional} irá lhe atender <small>Toque para iniciar o atendimento.</small>`
              state.watcher.content.img = 'https://cdn3.iconfinder.com/data/icons/doctor-icons/100/01-1Doctor-512.png'

              sessionStorage.setItem('chamadaAtiva', JSON.stringify(response.data.object))
          }
        }, error => {
          reject(error)
        }) 
      }              

      axios.all([getChamadaAtiva(), getAtendimentoImediato()])
      .then(axios.spread(function (acct, perms) {
        return true
      })) 
    },
    _doRequest({dispatch, state, getters, commit}, body){
      return new Promise((resolve, reject) => {
        if(!body.silent) {
          NProgress.start()
        }

        axios({
          method: body.method,
          url: process.env.VUE_APP_ROOT_API + body.endpoint,
          headers: {
            'token': body.token
          },              
          data: body.data,
          validateStatus: (status) => {
            return true; 
          },
        }).catch(error => {
            reject(error)
        }).then(response => {
            resolve(response)
        }).finally(() => {
          if(!body.silent) {
            NProgress.done()
          }
        })                  
      })          
    }  	
  },
  getters: {
    period: () => (string) => {
      if(parseInt(string) < 12) {
        return 'manhã'
      } else if(parseInt(string) >= 12 
        && parseInt(string) < 18) {
        return 'tarde'
      } else {
        return 'noite'
      }
      return false
    },    
    formatDay: () => (date, mode) => {
      let dateArr = date.split('/')
      let dateFormat = new Date(dateArr[2], parseInt(dateArr[1]) - 1, dateArr[0])
      
      var days = (mode) ? ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] : ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
      
      return days[dateFormat.getDay()]
    },
    getMonthName: () => (date) => {
      var monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembo"
      ];

      var day = (typeof date === 'string') ? new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]).getDate() : date.getDate();
      var monthIndex = (typeof date === 'string') ? new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]).getMonth() : date.getMonth();
      var year = (typeof date === 'string') ? new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]).getFullYear() : date.getFullYear();

      return monthNames[monthIndex]      
    },    
    formatDate: () => (date) => {
      var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];

      var day = (typeof date === 'string') ? new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]).getDate() : date.getDate();
      var monthIndex = (typeof date === 'string') ? new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]).getMonth() : date.getMonth();
      var year = (typeof date === 'string') ? new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]).getFullYear() : date.getFullYear();

      return day + '/' + monthNames[monthIndex] + '/' + year;      
    }
  }  
})
