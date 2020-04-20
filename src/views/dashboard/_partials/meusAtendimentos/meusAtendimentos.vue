<template>
    <div class="container meus-atendimentos">
      <div class="proximos">
        <h5>Próximos atendimentos</h5>
        <div v-if="vm._data.atendimentos.proximos.length" class="box detalhes" v-for="atendimento in vm._data.atendimentos.proximos">
          <div class="row ">
            <div class="col-lg-6">
              <img :src="atendimento.urlFoto" alt="" class="img-doctor">
              <div class="float-left">
                <h6>{{atendimento.nomeProfissional}}</h6>
                <p>{{atendimento.especialidade}}</p>
                <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="col-lg-6">
              <div class="float-right bg-gray">
                <span class="date">{{atendimento.dataAtendimentoFmt.split(' ')[0].split('/')[0]}} de {{ $store.getters.getMonthName(atendimento.dataAtendimentoFmt.split(' ')[0]) }} de {{atendimento.dataAtendimentoFmt.split(' ')[0].split('/')[2]}}</span>
                <span class="hour">{{atendimento.dataAtendimentoFmt.split(' ')[1]}} da {{ $store.getters.period( atendimento.dataAtendimentoFmt.split(' ')[1].split(':')[0] ) }}</span>
              </div>
              <div class="clearfix"></div>
              <ul class="float-right links-mobile">
           <!--      <li>
                  <a href="javascript:void(0)" @click="$router.replace('/atendimento/chamada').catch(err => { return false })" class="link-padrao">Ir para o atendimento</a>
                </li>   -->                
                <li>
                  <a href="javascript:void(0)" @click="reagendarAtendimento(atendimento.idAtendimento, atendimento.token, atendimento.dataAtendimentoFmt, atendimento.nomeProfissional)" class="link-padrao">Reagendar</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="cancelarAtendimento(false, atendimento.dataAtendimentoFmt, atendimento.idAtendimento)" class="link-cancel" data-toggle="modal" data-target="#cancel-agend">Cancelar atendimento</a>
                </li>              
              </ul>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>  
        <div v-if="!vm._data.atendimentos.proximos.length" >
          <p class="text-center">Não há próximos atendimentos.</p>
        </div>      
      </div>
      <div class="passados"  v-if="vm._data.atendimentos.realizados.length">
        <h5>Atendimentos passados</h5>
        <div class="box detalhes" v-for="atendimento in vm._data.atendimentos.realizados">
          <div class="row ">
            <div class="col-lg-6">
              <img :src="atendimento.urlFoto" alt="" class="img-doctor">
              <div class="float-left">
                <h6>{{atendimento.nomeProfissional}}</h6>
                <p>{{atendimento.especialidade}}</p>
                <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="col-lg-6">
              <div class="float-right bg-gray">
                <span class="date">{{atendimento.dataAtendimentoFmt.split(' ')[0].split('/')[0]}} de {{ $store.getters.getMonthName(atendimento.dataAtendimentoFmt.split(' ')[0]) }} de {{atendimento.dataAtendimentoFmt.split(' ')[0].split('/')[2]}}</span>
                <span class="hour">{{atendimento.dataAtendimentoFmt.split(' ')[1]}} da {{ $store.getters.period( atendimento.dataAtendimentoFmt.split(' ')[1].split(':')[0] ) }}</span>
              </div>
              <div class="clearfix"></div>
              <ul class="float-right links-mobile">
                <li>
                  <a  @click="novaConsulta(atendimento.nomeProfissional)" href="javascript:void(0)" class="link-padrao" >Agendar nova consulta</a>
                </li>                  
              </ul>
              <div class="clearfix"></div>
            </div>
          </div>
          <!-- submenus -->
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
          <!-- fim submenus -->
        </div>    
      </div>
      <div v-if="modal.status" class="modal fade bd-example-modal-lg" id="cancel-agend" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered cancelar-agendamento agendamento" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Tem certeza que deseja cancelar este agendamento?</h5>
              <button @click="modal.status = !modal.status" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-6">
                    <img src="/static/img/ico-calendar-red.svg" alt="">
                    <div class="float-left">
                      <p>{{modal.data.split(' ')[0].split('/')[1]}} de {{$store.getters.getMonthName(modal.data.split(' ')[0])}} de {{modal.data.split(' ')[0].split('/')[2]}}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <img src="/static/img/ico-clock-red.svg" alt="">
                    <div class="float-left">
                      <p>{{modal.data.split(' ')[1]}} da {{ $store.getters.period( modal.data.split(' ')[1].split(':')[0] ) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="modal.status = !modal.status" type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
              <button @click="cancelarAtendimento(true, false, modal.idAtendimento)" type="button" class="btn btn-primary">Cancelar agendamento</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
</template>

<script>
import Vue from "vue"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

var vm = new Vue({
  data: {
    atendimentos: {
      proximos: [],
      realizados: []
    }
  }
});

export default {

  name: 'meusAtendimentos',
  beforeRouteEnter(to, from, next) {
    next(self => {
      function getProximos() {
        self.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/atendimento/listar/proximos`, 
          token: self.token,
          data: {
            nome: ''
          }
        }).then(response => {
          if(response.status === 200) {
            vm._data.atendimentos.proximos = response.data.object
          }
        }, error => {
          reject(error)
        }) 
      }   

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

      axios.all([getProximos(), getRealizados()])
      .then(axios.spread(function (acct, perms) {
        return true
      })) 
    })    
  },
  data () {
    return {
      token:  sessionStorage.getItem('token'),
      modal: {
        data: [],
        idAtendimento: null,
        status: false
      }
    }
  },
  computed: {
    vm() {
      return vm;
    }
  },  
  methods: {
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
    },   
    async getProfessional(nomeProfissional) {
      var self = this 

      return new Promise((resolve, reject) => {
        this.$store.dispatch('_doRequest', {
          method: 'POST', 
          endpoint: `/integration/app-paciente/profissional/buscar/por/nome`, 
          token: this.token,
          data: {
            nome: ''
          }
        }).then(response => {
          let professional = response.data.object.filter(function(professional) {
            return self.slugify(professional.nome) === self.slugify(nomeProfissional)
          })        

          resolve(professional[0].id)
        }, error => {
          reject(error)
        })                  
      })       
    },
    slugify (str) {
      str = str.replace(/^\s+|\s+$/g, '');
      str = str.toLowerCase();

      var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
      var to   = "aaaaaeeeeeiiiiooooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      return str;
    },
    novaConsulta(nomeProfissional) {
      var self = this


      this.getProfessional(nomeProfissional).then(response => {
        self.$router.replace(`/atendimento-agendado/profissional/${response}`).catch(err => { return false })
      }, error => {
        return error
      })         
    },    
    reagendarAtendimento(idAtendimento, tokenAtendimento, dataAtendimento, nomeProfissional) {
      var self = this

      this.getProfessional(nomeProfissional).then(response => {
        self.$router.replace({
          name: 'profissional', 
          params: {idProfissional: response, idAtendimento: idAtendimento, dataAtendimento: dataAtendimento, tokenAtendimento: tokenAtendimento, reschedule: true}
        }).catch(err => { return false })
      }, error => {
        return error
      })         
    },
    cancelarAtendimento(bool, date, idAtendimento) {
      var self = this 

      this.modal.status = !this.modal.status
      this.modal.idAtendimento = parseInt(idAtendimento)

      if(date) {
        this.modal.data = date
      }

      if(bool) {
        this.$store.dispatch('_doRequest', {
          method: 'GET', 
          endpoint: `/integration/app-paciente/atendimento/cancelar/${idAtendimento}`, 
          token: self.token
        }).then(response => {
          let data = {
              title: response.status === 200 ? 'Sucesso' : 'Erro',
              text: (response.data.msg) ? response.data.msg : 'Cancelamento realizado com sucesso.'
          }
          self.$store.commit('modal', data) 

          self.$store.dispatch('_doRequest', {
            method: 'GET', 
            endpoint: '/integration/app-paciente/atendimento/listar/proximos', 
            token: self.token
          }).then(response => {
            if(response.status === 200) {
              vm._data.atendimentos.proximos = response.data.object  
            }

            return response
          }, error => {
            return error
          }) 
        }, error => {
          return error
        })          
      }
    }
  }
}
</script>

<style lang="css" scoped>
.meus-atendimentos .box img{
  height: 44px;
  width: 44px;
}
.modal.fade{
  display: flex; 
  background: rgba(0,0,0,.35);
  opacity: 1
}
.link-cancel {
  color: #f78190!important
}
.modal .col-sm-6{
  display: flex; 
  align-items: center;
}
.meus-atendimentos .box.detalhes:not(:last-child){
  margin-bottom: 30px
}
</style>