<template>
      <div class="row">
        <div class="col-md-5">
          <form @submit="_doLogin" class="form-signin">
            <conexa-logo />
            <p class="h3 font-weight-normal">
            	{{($route.name === 'login') ? 'Para entrar utilize as credenciais que você recebeu de sua clínica, hospital ou convênio' : 'Se você deseja resetar sua senha, informe seu e-mail abaixo.' }}
            </p>
            <div class="relative">

              <input v-model="login.email" type="email" id="inputEmail" class="form-control" placeholder="Email" required="">
              <svg id="email" data-name="icon-email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>icone-email</title>
                <path d="M4,6V19H20V6ZM4,4H20a2,2,0,0,1,2,2V19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4Z"/>
                <path d="M4,6.71V19H20V6.71l-8,7.88ZM5.4,5.29,12,11.78l6.6-6.49A2,2,0,0,1,22,6.71V19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6.71a2,2,0,0,1,2-2A2,2,0,0,1,5.4,5.29Z"/>
              </svg>
            </div>
            <div v-if="$route.name === 'login'" class="relative">

              <input v-model="login.senha" type="password" id="inputPassword" class="form-control" placeholder="Senha" required="">
              <svg id="senha" data-name="icon-senha" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>icone-senha</title>
                <path d="M12.64,4.38a6,6,0,0,1,1.58,5.7L21,16.84l-1.21,2.39-3.3.19a1,1,0,0,1-1.06-.94,1.14,1.14,0,0,1,.05-.37l.09-.28a.72.72,0,0,0-.46-.9.75.75,0,0,0-.51,0,.61.61,0,0,1-.8-.8l0-.05a.53.53,0,0,0-.27-.69.57.57,0,0,0-.46,0l-.7.39a1,1,0,0,1-1.19-.17L10,14.42a6,6,0,1,1,2.69-10ZM9.1,6.5a2,2,0,1,0,0,2.83A2,2,0,0,0,9.1,6.5Z"/>
              </svg>
            </div>
            <button class="btn btn-lg btn-primary btn-block button success" type="submit">Entrar</button>

            <a href="javascript:void(0)" @click="$router.push($route.name === 'esqueci-senha' ? 'login' : 'esqueci-senha').catch(err => { return false })">{{$route.name === 'login' ? 'Esqueci a senha' : 'Login'}}</a>
            <a href="https://ativesuaconta.conexasaude.com.br/" title="Problemas de acesso" target="_blank">Problemas de acesso</a>
          </form>
        </div>
        <div class="col-md-7">
          <img src="static/img/bg-login.svg" alt="" class="img-fluid float-right medico">
          <div class="clearfix"></div>
        </div>
      </div>
</template>

<script>
import NProgress from "nprogress";
import conexaLogo from '@/components/conexaLogo/conexaLogo.vue';

export default {

  name: 'login',
  components: {
    conexaLogo
  },    
  data () {
    return {
      login: {
        email: '',
        senha: ''
      }
    }
  },
  methods: {
    _doLogin: function (e) {
      var self = this
      var route = self.$router.history.current

      self.$store.dispatch('_doRequest', {
          method: 'POST',
          endpoint: `/integration/app-paciente/usuario/${route.name}`,
          token: '',
          data: self.login
        }).then(response => {
          if(response.status === 200 && route.name === 'esqueci-senha') {
            let data = {
              title: 'Sucesso',
              text: 'Foi enviado um e-mail pra você. Verifique sua caixa de entrada.'
            }
            self.$store.commit('modal', data)            
          } else if(response.status !== 200) {
            let data = {
                title: 'Erro',
                text: (response.data.msg) ? response.data.msg : 'Ocorreram erros ao tentar se conectar com a API.'
            }
            self.$store.commit('modal', data) 
          } else {
            self.$router.push({ name: 'escolha', params: { users: response.data.object } }).catch(err => { return false })
          }
      }, error => {
          return error
      })       

      if(e!==undefined) {
        e.preventDefault();
      }
    }
  }  
}
</script>

<style lang="sass">
@import './sass/_style'
footer
  margin-top: 0!important
</style>