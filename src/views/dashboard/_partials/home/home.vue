<template>
  <div class="inicio">
    <div class="container">
      <div class="row">
        <div class="col-sm-5 col-md-6 col-lg-8">
           <h1>Olá <span>{{user.nome}}</span>, <br /> Como podemos lhe <span>ajudar</span>?</h1>
        </div>
        <div class="col-sm-7 col-md-6 col-lg-4">
          <form>
            <div class="search-container">
              <span class="icon"><img src="static/img/ico-search.svg" alt=""></span>
              <input @input="_doSearch" v-model="busca" type="search" id="search" placeholder="Digite sua dúvida sobre saúde" class="form-control">
            </div>
          </form>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="row category">
        <div v-for="service in services" v-if="service.habilitado" class="col-md-6 col-md-6 col-xl-3 w3-container w3-center w3-animate-zoom1">
          <div class="box">
            <h3>{{service.id}}</h3>
            <img :src="`static/img/${service.id.toLowerCase()}.svg`" class="img-fluid rounded mx-auto d-block">
            <div class="mx-auto">
              <a @click="_doSetService(service, 'atendimento-imediato')" href="javascript:void(0)" class="atendimento">Atendimento imediato</a>
              <div class="clearfix"></div>
            </div>
            <div class="mx-auto">
              <a @click="_doSetService(service, 'atendimento-agendado')" href="javascript:void(0)" class="atendimento">Atendimento agendado</a>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div> 
    </div>
   
  </div>
</template>

<script>
export default {

  name: 'home',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(to.params.token && to.params.user) {
        sessionStorage.setItem('token', to.params.token)
        sessionStorage.setItem('user', JSON.stringify(to.params.user))
      }

      if(sessionStorage.getItem('token')) {
        vm.$store.state.watcher.interval = setInterval(function(){
          let body = {
            token: sessionStorage.getItem('token')  
          }
          vm.$store.dispatch('_setWatcher', body)
        }, 3000)
      }

      sessionStorage.removeItem('sintomasEscolhidos')
      sessionStorage.removeItem('sintomasIncomodam')
      sessionStorage.removeItem('medicamentosEscolhidos')  
      sessionStorage.removeItem('sintomas')      
      sessionStorage.removeItem('service')    

      vm.user = to.params.user || JSON.parse(sessionStorage.getItem('user'))
      vm.token = to.params.token || sessionStorage.getItem('token')

      if(!sessionStorage.getItem('services')) {
        vm.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: '/integration/app-paciente/clinica/configuracoes', 
          token: to.params.token || sessionStorage.getItem('token')        
        }).then(response => {
          if(response.status === 200) {
            let clinica = response.data.object 

            let services = {
              servicoMedico: clinica.servicoMedico,
              servicoEnfermagem: clinica.servicoEnfermagem,
              servicoPsicologia: clinica.servicoPsicologia,
              servicoNutricao: clinica.servicoNutricao,
              servicoDentista: clinica.servicoDentista,
              servicoFisioterapeuta: clinica.servicoFisioterapeuta,
              servicoFonoaudiologo: clinica.servicoFonoaudiologo
            }

            sessionStorage.setItem('services', JSON.stringify(services))

            vm.services = services
          }
        }, error => {
            return error
        })
      } else {
        vm.services = JSON.parse(sessionStorage.getItem('services'))
      }
    })    
  },
  data () {
    return {  
      token: '',
      services: '',
      user: '',
      busca: '',
      timeout: null
    }
  },
  methods: {
    _doSearch(v) {
      var self = this

      clearTimeout(self.timeout);

      self.timeout = setTimeout(function () {
        if(v.target.value) {
          let data = {
              title: `Resultados da busca para '${v.target.value}'`,
              text: `<iframe src='https://www.pergunteaomedico.com.br/${v.target.value}' width='568' height='350' />`
          }
          self.$store.commit('modal', data)   
        }       
      }, 500);  
    },
    _doSetService(service, type) {
      var self = this

      sessionStorage.setItem('service', JSON.stringify(service))

      if(type === 'atendimento-agendado') {
        this.$router.push({ name: 'preferencia', params: { type: type } }).catch(err => { return false })
      } else {
        this.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/util/sintoma/listar/${service.id}`, 
          token: self.token       
        }).then(response => {
          if(response.status === 200 && response.data.object.length) {
            sessionStorage.setItem('sintomas', JSON.stringify(response.data.object))

            this.$router.push({ name: 'sintomas', params: { type: type, service: service, sintomas: response.data.object } }).catch(err => { return false })
          } else {
            this.$router.push({ name: 'anexos', params: { type: type } }).catch(err => { return false })
          }
        }, error => {
            return error
        })  
      }
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
.md-dialog-container,
.md-dialog.md-theme-default
  height: 50vh
  width: 100vw
  iframe 
    border: 0
    overflow: hidden 
    margin-top: -70px
    margin-bottom: -20px
    height: calc(100% + 70px)
    width: 100%
</style>