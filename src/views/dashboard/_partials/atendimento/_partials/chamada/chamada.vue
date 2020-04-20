<template>
    <div class="container chamada">
      <h1>Chamada com {{resumoChamada.nomeMedico}} em andamento</h1>
      <div class="row">
        <div class="col-lg-8 aguardando">
          <div class="box">
            <div class="row bg-white">
              <div class="col-12">
                <div class="chamada-holder">
                  <iframe :src="resumoChamada.zoomMeetingUrl" frameborder="0"></iframe>
                  <div>
                    <img :src="resumoChamada.urlFoto" alt="" class="photo">
                    <h2>Estabelecendo conexão<br> com {{resumoChamada.nomeMedico}}…</h2>                  
                  </div>                  
                </div>
              </div>
            </div>
            <div class="row bg-gray">
              <div class="col-6">
                <span class="ico-wifi"></span>
                <p>Procure sempre consultar-se<br>utilizando o Wi-Fi.</p>
              </div>
              <div class="col-6">
                <span class="ico-lamp"></span>
                <p>Deixe o ambiente bem iluminado.<br>Assim todos podem se ver.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="box p-0 resumo-atend">
            <h5>Resumo do atendimento</h5>
            <ul>
              <li v-if="resumoChamada.queixasPaciente">
                <h6>Você se queixou</h6>
                <p>{{ resumoChamada.queixasPaciente }}</p>
              </li>
              <li v-if="resumoChamada.anexosPaciente">
                <h6>Você anexou</h6>
                <p v-for="anexo in resumoChamada.anexosPaciente"><a :href="anexo.urlDownload">{{ anexo.legenda }}</a></p>
              </li>
            </ul>
            <form>
             <div id="carregarImg" class="enviar-anexo">
               <input id="novoAnexo" @change="novoAnexo" type="file" />
               <span>Enviar anexo</span>
               {{novoAnexoName}}
             </div>
             <div style="height: 0px;width: 0px; overflow:hidden;"><input id="upfile" type="file" value="upload" onchange="sub(this)"></div>
           </form>
          </div>
        </div>
      </div>
      <h6>Histórico de atendimento</h6>
      <ul>
        <li v-for="atendimento in vm._data.atendimentos.realizados">
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            <div class="float-left">
              <span class="date">{{$store.getters.formatDay(atendimento.detalhes.dataAtendimento, true)}}, {{atendimento.detalhes.dataAtendimento}}</span>
              <span class="hour">{{atendimento.detalhes.horaAtendimento}} da {{ $store.getters.period( atendimento.detalhes.horaAtendimento.split(':')[0] ) }}</span>
            </div>
            <span @click="expand" class="link-padrao">Detalhar</span>
            <div class="clearfix"></div>
          </button>

          <div class="collapse" id="collapseExample">
            <div class="card card-body submenu-desktop">
              <ul class="nav nav-tabs responsive page-nav" role="tablist">
                  <li class="nav-item">
                    <a @click="tabNavigation" class="nav-link active" data-toggle="tab" href="#proximo-parecer2" role="tab">
                      Parecer
                      <div class="menu-line"></div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a @click="tabNavigation" class="nav-link" data-toggle="tab" href="#proximo-prescricao2" role="tab">
                      Prescrição médica
                      <div class="menu-line"></div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a @click="tabNavigation" class="nav-link" data-toggle="tab" href="#proximo-anexados-prof2" role="tab">
                      Anexados pelo profissional
                      <div class="menu-line"></div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a @click="tabNavigation" class="nav-link" data-toggle="tab" href="#proximo-anexados-vc2" role="tab">
                      Anexados por você
                      <div class="menu-line"></div>
                    </a>
                  </li>
                </ul>
                <div class="tab-content responsive">
                <div class="tab-pane active" id="proximo-parecer2" role="tabpanel">
                  <p>{{atendimento.detalhes.parecerDoMedico}}</p>
                </div>
                <div class="tab-pane" id="proximo-prescricao2" role="tabpanel">
                  <p>{{atendimento.detalhes.medicacaoPrescrita}}</p>
                </div>
                <div class="tab-pane anexo" id="proximo-anexados-prof2" role="tabpanel">
                  <div class="row">
                    <div class="col-sm-6" v-for="anexo in atendimento.detalhes.anexosProfissional">
                      <a target="_blank" :href="anexo.urlDownload">{{anexo.nomeArquivo.split('/')[3]}}</a>
                      <p>Arquivo {{anexo.extensaoArquivo}}</p>
                    </div>
                  </div>
                </div>
                <div class="tab-pane anexo" id="proximo-anexados-vc2" role="tabpanel">
                  <div class="row">
                    <div class="col-sm-6" v-for="anexo in atendimento.detalhes.anexosPaciente">
                      <a target="_blank" :href="anexo.urlDownload">{{anexo.nomeArquivo.split('/')[3]}}</a>
                      <p>Arquivo {{anexo.extensaoArquivo}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="accordion" class="submenu-mobile">
              <div class="card">
                <div class="card-header">
                  <a class="card-link active" data-toggle="collapse" href="javascript:void(0)" @click="accordion" data-href="#parecer2" aria-expanded="true">
                    Parecer
                  </a>
                </div>
                <div id="parecer2" class="collapse show" data-parent="#accordion">
                  <div class="card-body">
                    <p>{{atendimento.detalhes.parecerDoMedico}}</p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">
                  <a class="collapsed card-link" data-toggle="collapse" href="javascript:void(0)" @click="accordion" data-href="#prescricao2">
                    Prescrição médica
                  </a>
                </div>
                <div id="prescricao2" class="collapse" data-parent="#accordion">
                  <div class="card-body">
                    <p>{{atendimento.detalhes.medicacaoPrescrita}}</p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">
                  <a class="collapsed card-link" data-toggle="collapse" href="javascript:void(0)" @click="accordion" data-href="#anex-pelo-prof2">
                    Anexados pelo profissional
                  </a>
                </div>
                <div id="anex-pelo-prof2" class="collapse" data-parent="#accordion">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-6" v-for="anexo in atendimento.detalhes.anexosProfissional">
                        <a target="_blank" :href="anexo.urlDownload">{{anexo.nomeArquivo.split('/')[3]}}</a>
                        <p>Arquivo {{anexo.extensaoArquivo}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">
                  <a class="collapsed card-link" data-toggle="collapse" href="javascript:void(0)" @click="accordion" data-href="#anex-por-vc2">
                    Anexados por voce
                  </a>
                </div>
                <div id="anex-por-vc2" class="collapse" data-parent="#accordion">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-6" v-for="anexo in atendimento.detalhes.anexosPaciente">
                        <a target="_blank" :href="anexo.urlDownload">{{anexo.nomeArquivo.split('/')[3]}}</a>
                        <p>Arquivo {{anexo.extensaoArquivo}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import Vue from "vue"
import axios from 'axios'
import VueAxios from 'vue-axios'
var slugify = require('slugify')
Vue.use(VueAxios, axios)

var vm = new Vue({
  data: {
    atendimentos: {
      realizados: []
    }
  }
});

export default {

  name: 'chamadaAtendimento',
  beforeRouteEnter(to, from, next) {
    next(self => {   
      self.$store.dispatch('_clearWatcher') 

      setInterval(function(){
        console.log(window)
      }, 3000)      

      function getRealizados() {
        self.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/atendimento/listar/realizados`, 
          token: self.token,
          data: {
            nome: ''
          }
        }).then(response => {
          if(response.status === 200) {
            for (const [key, atendimento] of Object.entries(response.data.object)) {
                atendimento.detalhes = []
                self.$store.dispatch('_doRequest', {
                    method: 'GET', 
                    endpoint: `/integration/app-paciente/atendimento/detalhar/${atendimento.idAtendimento}`, 
                    token: self.token,
                    data: {
                      nome: ''
                    }
                  }).then(response => {
                    atendimento.detalhes = response.data.object
                    vm._data.atendimentos.realizados.push(atendimento)
                  }, error => {
                    reject(error)
                  })                 
            }
          }
        }, error => {
          reject(error)
        }) 
      }

      function getChamada() {
        self.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/atendimento/resumo/chamada`, 
          token: self.token,
          data: {
            nome: ''
          }
        }).then(response => {
          if(response.status === 200) {
            sessionStorage.setItem('resumoChamada', JSON.stringify(response.data.object))
            self.resumoChamada = JSON.parse(sessionStorage.getItem('resumoChamada'))
          } else {
            self.$router.replace({
              name: 'inicio', 
            }).catch(err => { return false })            
          }
        }, error => {
          reject(error)
        }) 
      }              

      axios.all([getRealizados(), getChamada()])
      .then(axios.spread(function (acct, perms) {
        return true
      })) 
    })    
  },
  data () {
    return {
      token:  sessionStorage.getItem('token'),
      resumoChamada: [],
      chamadaAtiva: JSON.parse(sessionStorage.getItem('chamadaAtiva')),
      zoomMeetingUrl: '',
      novoAnexoName: ''
    }
  },
  computed: {
    vm() {
      return vm;
    }
  },    
  methods: {
    novoAnexo(e) {
      var self = this 

      let file = e.target.files[0]

      const image2base64 = require('image-to-base64')

      var url = URL.createObjectURL(file) 

      var idAnexo = slugify(file.name.replace(`.${ext}`, ''), {
        replacement: '_',    
        remove: /[*+~.()'"!:@]/g,      
        lower: true,     
      })      

      var ext = file.type.split('/')[1]

      self.novoAnexoName = ` (${file.name})`

      image2base64(url) 
        .then(
            (response) => {
              let body = {
                conteudoBase64: response,
                idAnexo: idAnexo,
                nomeExtensao: ext,
                legenda: file.name
              }     

              self.$store.dispatch('_doRequest', {
                method: 'POST',
                endpoint: `/integration/app-paciente/atendimento/upload/anexo/${self.chamadaAtiva.idAtendimento}`,
                token: self.token,
                data: body
              }).then(response => {
                if(response.status === 200) { 
                  setTimeout(function(){
                    self.$store.dispatch('_doRequest', {
                      method: 'GET', 
                      endpoint: `/integration/app-paciente/atendimento/resumo/chamada`, 
                      token: self.token,
                      data: {
                        nome: ''
                      }
                    }).then(response => {
                      let data = {
                        title: 'Sucesso',
                        text: 'Arquivo anexo com sucesso.'
                      }
                      self.$store.commit('modal', data)                        
                      self.resumoChamada.anexosPaciente = response.data.object.anexosPaciente
                      self.novoAnexoName = ''
                    }, error => {
                      reject(error)
                    }) 
                  }, 6000);                                 
                }
              }, error => {
                return error
              })                
            } 
        )
        .catch(
            (error) => {
                console.log(error); 
            }
        )
      
    },
    expand(e) {
      if(!e.target.parentNode.nextElementSibling.classList.contains('active')) {
        e.target.parentNode.nextElementSibling.classList.add('active')
      } else {
        e.target.parentNode.nextElementSibling.classList.remove('active')
      }
    },
    accordion(e) {
      if(!e.target.classList.contains('active')) {
        e.target.classList.add('active')
      } else {
        e.target.classList.remove('active')
      }

      if(!e.target.parentNode.nextElementSibling.classList.contains('show')) {
        e.target.parentNode.nextElementSibling.classList.add('show')
      } else {
        e.target.parentNode.nextElementSibling.classList.remove('show')
      }      

      e.preventDefault();
    },
    tabNavigation(e) {
      for (var i = 0; i < e.target.parentNode.parentNode.childNodes.length; i++) {
        if(e.target.parentNode.parentNode.childNodes[i].childNodes[0] !== undefined) {
          if(e.target.parentNode.parentNode.childNodes[i].childNodes[0].hash===e.target.hash) {
            e.target.parentNode.parentNode.childNodes[i].childNodes[0].classList.add('active')
          } else {
            e.target.parentNode.parentNode.childNodes[i].childNodes[0].classList.remove('active')
          }
        }
      }

      for (var i = 0; i < e.target.parentNode.parentNode.nextElementSibling.childNodes.length; i++) {
        if(e.target.parentNode.parentNode.nextElementSibling.childNodes[i].classList !== undefined) {
          if(e.target.parentNode.parentNode.nextElementSibling.childNodes[i].id === e.target.hash.replace('#','')) {
            e.target.parentNode.parentNode.nextElementSibling.childNodes[i].classList.add('active')
          } else {
            e.target.parentNode.parentNode.nextElementSibling.childNodes[i].classList.remove('active')
          }
        }
      }
      e.preventDefault();
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
</style>