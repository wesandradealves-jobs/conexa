<template>
      <div class="row">
        <div class="col-12">
          <form @submit="_doSubmitChanges" class="form-signin">
            <div class="perfil">
              <img :src="($store.state.urlFoto) ? $store.state.urlFoto : user.urlFoto" alt="">
              <input type="file" v-on:change="changePhoto" class="photo">
              <img src="static/img/cruz-grande.svg" alt="" class="cruz-grande">
              <img src="static/img/cruz-pequena.svg" alt="" class="cruz-pequena">
            </div>
            <div class="info">
              <p>{{`${user.nome} | ${ (user) ? user.idade : user.idade } anos`}}</p>
              <p>{{user.email}}</p>
            </div>
            <div class="relative">
              <input :readonly="true" v-model="form.nome" type="text" class="form-control" placeholder="Nome" required="">
              <svg id="nome" data-name="icon-usu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Usuario</title>
                <path class="cls-2" d="M12,10A3,3,0,1,0,9,7,3,3,0,0,0,12,10Zm0,2a5,5,0,1,1,5-5A5,5,0,0,1,12,12ZM5,22V20.5A4.49,4.49,0,0,1,9.5,16h5A4.49,4.49,0,0,1,19,20.5V22h2V20.5A6.5,6.5,0,0,0,14.5,14h-5A6.5,6.5,0,0,0,3,20.5V22ZM3,22H5V20.5A4.49,4.49,0,0,1,9.5,16h5A4.49,4.49,0,0,1,19,20.5V22h2V20.5A6.5,6.5,0,0,0,14.5,14h-5A6.5,6.5,0,0,0,3,20.5Z"/>
              </svg>
            </div>
            <div class="relative">
                <the-mask 
                  :mask="['##/##/####']" 
                  type="tel" 
                  :masked="true"
                  v-model="form.dataNascimento"
                  :class="'form-control'"
                  :required="'required'"
                  :readonly="true"
                  placeholder="Data de nascimento"></the-mask>              
              <svg id="niver" data-name="icon-niver" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Data de nascimento</title>
                <path class="cls-2" d="M5,23V18H19v5h2V18a2,2,0,0,0-2-2H5a2,2,0,0,0-2,2v5ZM3,23H5V18H19v5h2V18a2,2,0,0,0-2-2H5a2,2,0,0,0-2,2Zm5-7V12h8v4h2V12a2,2,0,0,0-2-2H8a2,2,0,0,0-2,2v4ZM6,16H8V12h8v4h2V12a2,2,0,0,0-2-2H8a2,2,0,0,0-2,2Z"/><path class="cls-2" d="M13,7v4H11V7ZM12,1a6.67,6.67,0,0,1,1,2.79C13,4.58,12.54,5,12,5s-1-.42-1-1.21A6.67,6.67,0,0,1,12,1Z"/></svg>
            </div>
            <div class="relative">
              <input v-model="form.email" type="email" class="form-control" placeholder="Email" readonly="true">
              <svg id="email" data-name="icon-email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Email</title>
                <path d="M4,6V19H20V6ZM4,4H20a2,2,0,0,1,2,2V19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4Z"/>
                <path d="M4,6.71V19H20V6.71l-8,7.88ZM5.4,5.29,12,11.78l6.6-6.49A2,2,0,0,1,22,6.71V19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6.71a2,2,0,0,1,2-2A2,2,0,0,1,5.4,5.29Z"/>
              </svg>
            </div>            
            <div class="relative">
                <the-mask 
                  :mask="['(##) ####-####', '(##) #####-####']" 
                  type="tel" 
                  :masked="true"
                  v-model="form.telefoneCelularSemFormatacao"
                  :class="'form-control'"
                  :required="'required'"
                  placeholder="Telefone Celular"></the-mask>
                <i data-name="icon-phone" class="material-icons">
                phone_iphone
                </i>
            </div>            
            <div class="relative">
              <input v-model="form.senha" type="password" class="form-control" placeholder="Senha">
              <svg id="senha" data-name="icon-senha" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Senha</title>
                <path d="M12.64,4.38a6,6,0,0,1,1.58,5.7L21,16.84l-1.21,2.39-3.3.19a1,1,0,0,1-1.06-.94,1.14,1.14,0,0,1,.05-.37l.09-.28a.72.72,0,0,0-.46-.9.75.75,0,0,0-.51,0,.61.61,0,0,1-.8-.8l0-.05a.53.53,0,0,0-.27-.69.57.57,0,0,0-.46,0l-.7.39a1,1,0,0,1-1.19-.17L10,14.42a6,6,0,1,1,2.69-10ZM9.1,6.5a2,2,0,1,0,0,2.83A2,2,0,0,0,9.1,6.5Z"/>
              </svg>
            </div>
            <div class="relative">
              <input v-model="form.confirmacaoSenha" type="password" class="form-control" placeholder="Confirmação de Senha" :required="form.senha !== '' ? true : false">
              <svg id="senha" data-name="icon-senha" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Confirmação de Senha</title>
                <path d="M12.64,4.38a6,6,0,0,1,1.58,5.7L21,16.84l-1.21,2.39-3.3.19a1,1,0,0,1-1.06-.94,1.14,1.14,0,0,1,.05-.37l.09-.28a.72.72,0,0,0-.46-.9.75.75,0,0,0-.51,0,.61.61,0,0,1-.8-.8l0-.05a.53.53,0,0,0-.27-.69.57.57,0,0,0-.46,0l-.7.39a1,1,0,0,1-1.19-.17L10,14.42a6,6,0,1,1,2.69-10ZM9.1,6.5a2,2,0,1,0,0,2.83A2,2,0,0,0,9.1,6.5Z"/>
              </svg>
            </div>            
            <button class="btn btn-lg btn-primary btn-block" type="submit">Confirmar alterações</button>
          </form>
        </div>
      </div>	
</template>

<script>

import Vue from "vue"
import {TheMask} from 'vue-the-mask'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {

  name: 'meuPerfil',
  components: {TheMask},
  data () {
    return {
      form: {
        nome: JSON.parse(sessionStorage.getItem('user')).nome,
        dataNascimento: JSON.parse(sessionStorage.getItem('user')).dataNascimento || JSON.parse(sessionStorage.getItem('user')).dataNascimento,
        email: JSON.parse(sessionStorage.getItem('user')).email || JSON.parse(sessionStorage.getItem('user')).email,
        telefoneCelularSemFormatacao: JSON.parse(sessionStorage.getItem('user')).telefoneCelular ||  JSON.parse(sessionStorage.getItem('user')).telefoneCelular,
        senha: '',
        confirmacaoSenha: ''
      },
      fotoObject: [],
      user: JSON.parse(sessionStorage.getItem('user')),
      token: sessionStorage.getItem('token'),
      changedProfileStatus: 0
    }
  },  
  methods: {
    _doSubmitChanges(e) {
      var self = this

      let msg = ''

      function changeProfile() {
        return self.$store.dispatch('_doRequest', {
          method: 'POST', 
          endpoint: '/integration/app-paciente/dados-pessoais/alterar-perfil', 
          token: self.token,
          data: {
            celular: self.form.telefoneCelularSemFormatacao,
            confirmacaoSenha: self.form.confirmacaoSenha,
            senha: self.form.senha
          }
        }).then(response => {
          if(self.form.senha && self.form.senha === self.form.confirmacaoSenha) {
            localStorage.clear();    
            sessionStorage.clear();
            self.changedProfileStatus = 4
            // self.$store.dispatch('_doLogout')
            self.$store.commit('logout', false)   
          } else {
            self.changedProfileStatus+=1          
          }            

          return response
        }, error => {
          return error
        })  
      }   

      function changePicture() {
        return self.$store.dispatch('_doRequest', {
          method: 'POST', 
          endpoint: '/integration/app-paciente/dados-pessoais/upload-foto', 
          token: self.token,
          data: self.fotoObject
        }).then(response => {
          if(response.status === 200) {
            self.changedProfileStatus+=1
          }      
          return response
        }, error => {
          return error
        })          
      }        

      axios.all([changePicture(), changeProfile()])
      .then(axios.spread(function (acct, perms) {
        return true
      })).finally(() => {
        let data = []

        switch(self.changedProfileStatus) {
          case 1:
          case 2:
            data = {
              title: 'Sucesso',
              text: 'Seus dados foram alterados com sucesso.'
            }
          break;
          case 3:
            data = {
              title: 'Erro',
              text: msg
            }               
          break;
          case 4:
            data = {
              title: 'Sucesso',
              text: 'Seus dados foram alterados com sucesso. Por favor, faça o login novamente.'
            }
          break;
        }

        self.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: '/integration/app-paciente/dados-pessoais/', 
          token: self.token    
        }).then(response => {
          if(response.status === 200) {
            sessionStorage.setItem('user', JSON.stringify(response.data.object))
          }
        }, error => {
          return error
        })  

        self.$store.commit('modal', data)   

        self.changedProfileStatus = 0
      }); 

      e.preventDefault();
    },
    changePhoto(e) {
      var self = this 

      const image2base64 = require('image-to-base64')

      let file = e.target.files[0];

      self.$store.state.urlFoto = URL.createObjectURL(file) 

      image2base64(URL.createObjectURL(file) ) 
          .then(
              (response) => {
                self.fotoObject = {
                  conteudoBase64: response,
                  nomeExtensao: file.type.split('/')[1]
                }                  
              } 
          )
          .catch(
              (error) => {
                  console.log(error); 
              }
          )    
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
</style>