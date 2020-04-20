<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5">

        <a href="javascript:void(0)" @click="$store.commit('logout', false)">
          <svg id="back" data-name="ico-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 13">

            <title>Voltar</title>
            <g id="Page-1">
              <g id="ico-back-gray"><path class="cls-1" d="M6.34,13a1,1,0,0,1-.73-.31L.29,7.21a1,1,0,0,1,0-1.42L5.61.31A1,1,0,0,1,6.33,0a1,1,0,0,1,.72.29,1,1,0,0,1,0,1.43L3.41,5.49H11a1,1,0,1,1,0,2H3.41l3.66,3.77A1,1,0,0,1,6.34,13Z" transform="translate(0 0)"/>
              </g>
            </g>
          </svg>
        </a>
        <h2>O que deseja acessar?</h2>
        <p class="sub-title">Escolha a clínica, hospital ou convênio.</p>

        <ul class="list-hospital">
          <li v-for="user in this.users" class="from-left">
            <a href="javascript:void(0)" @click="_doValidaToken(user)">
              <span class="urlFoto" :style="{ backgroundImage: 'url(' + user.usuario.paciente.urlFoto + ')' }"></span> 
              <span>
                {{ user.usuario.paciente.nome }} <br/> <small>{{ user.usuario.clinica.nome }}</small>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-7">
        <img src="static/img/medico.svg" alt="" class="img-fluid float-right medico">
        <div class="clearfix"></div>
      </div>      
    </div>
    <md-dialog-confirm
      :md-active.sync="$store.state.isAceitaTermo"
      md-title="Termos e Condições gerais de uso"
      md-content="Nós, da <b>CONEXA  SAÚDE</b>,  consideramos  que   a   relação   com   nossos  <b>Usuários</b> deve   ser  
pautada na  maior confiança e respeito, para  garantir  a todos a melhor  experiência possível.<br/><br/>
Entendemos  que a leitura completa  pode  levar algum tempo.  <br/><br/>
Então,  caso  não tenha disponibilidade neste momento,  apresentamos abaixo um  pequeno
resumo  dos pontos  mais  importantes.<br/><br/>Para a compreensão completa e leitura total dos termos e condições gerais de uso da <b>Plataforma Conexa Saúde</b>, leia nossos <a style='text-decoration:underline!important' href='https://s3.sa-east-1.amazonaws.com/drvirtual/downloads/termo_uso_b2c.pdf' target='_blank'>termos e condições gerais de uso</a>."
      md-confirm-text="Aceito"
      md-cancel-text="Não aceito"
      @md-cancel="$store.state.isAceitaTermo = false"
      @md-confirm="_doAceitarTermo"
      />      
  </div>

</template>

<script>
export default {

  name: 'escolha',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(to.params.users) {
        sessionStorage.setItem('users', JSON.stringify(to.params.users))
      }
      vm.users = to.params.users || JSON.parse(sessionStorage.getItem('users'))
    })    
  },
  data () {
    return {
      user: '',
      token: '',
      users: ''
    }
  },
  methods: {
    _doAceitarTermo() {
        var self = this
        this.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: '/integration/app-paciente/usuario/aceitar-termo', 
          token: self.token        
        }).then(response => {
          if(response.status === 200) {
            self.$router.push({ name: 'inicio', params: { user: self.user, token: self.token } }).catch(err => { return false })
          }
        }, error => {
            return error
        }) 
    },     
    _doCheckTerms(token) {
        var self = this

        this.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: '/integration/app-paciente/usuario/termo-aceito', 
          token: token        
        }).then(response => {
          if(response.status !== 200) {
            self.$store.commit('aceitaTermo', true)   
          } else {
            self.$router.push({ name: 'inicio', params: { user: self.user, token: self.token } }).catch(err => { return false })
          }
        }, error => {
            return error
        }) 
    },    
    _doValidaToken(data) {
        var self = this
        
        self.token = data.token
        self.user = data.usuario

        this.$store.dispatch('_doRequest', {
            method: 'GET', 
            endpoint: '/integration/app-paciente/usuario/validar-token', 
            token: data.token       
        }).then(response => {
          if(response.status === 200) {
            self._doCheckTerms(data.token)
          }
        }, error => {
            return error
        }) 
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
</style>