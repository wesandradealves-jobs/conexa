<template>
	<div class="col-12">
    <div v-if="this.filter" class="container atend-data">
      <div class="row periodo">
        <div class="col-12">
          <span>Período de atendimento:</span>
          <a @click="_doSetPeriod('')" href="javascript:void(0)">Todos</a>
          <a @click="_doSetPeriod('manhã')" href="javascript:void(0)">Manhã</a>
          <a @click="_doSetPeriod('tarde')" href="javascript:void(0)">Tarde</a>
          <a @click="_doSetPeriod('noite')" href="javascript:void(0)">Noite</a>
        </div>
      </div>        
    </div>    
    <ul class="horarios">
      <li v-for="day in hourlies">
        <p>
          {{format(day.date, 'dayName')}}
          <br/>
          {{format(day.date, 'dayNumber')}}/{{format(day.date, 'monthName')}}
        </p>
        <p>
          <a :data-period="$store.getters.period(hourly.split(':')[0])" href="javascript:void(0)" 
          @click="date = day.date + ' ' + hourly" v-for="hourly in day.hourly">
            {{ hourly }}
          </a>
        </p>
      </li>
    </ul>
    <!-- modal confirmar agendamento -->
    <div v-if="modal.confirm.status" class="modal bd-example-modal-lg" id="confirm-agend" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered confirmar-agendamento agendamento" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Você confirma o agendamento dessa consulta?</h5>
            <button @click="modal.confirm.status = false" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <img src="static/img/ico-calendar-blue.svg" alt="">
                  <div class="float-left">
                    <p>{{modal.confirm.data.day}}</p>
                    <p>{{modal.confirm.data.date}}</p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <img src="static/img/ico-clock-blue.svg" alt="">
                  <div class="float-left">
                    <p>{{modal.confirm.data.hourly}}</p>
                    <p>da {{$store.getters.period( modal.confirm.data.hourly.split(':')[0] )}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="modal.confirm.status = false" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button @click="_doSetSchedule" type="button" class="btn btn-primary">Confirmar</button>
          </div>
        </div>
      </div>
    </div>   
    <div v-if="modal.success" class="modal bd-example-modal-lg" id="agend-realizado" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered agendamento-realizado" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agendamento realizado!</h5>
            <button @click="modal.success = false" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <p>Vamos te avisar assim que chegar a hora da consulta, informando o nome do
                  profissional via app e sms.</p>
                  <p>Fique atento.</p>
                </div>
                <div class="col-sm-6">
                  <img src="/static/img/sucesso.svg" width="100%" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="modal.success = false; $router.replace('/meus-atendimentos')" type="button" class="btn btn-primary" data-dismiss="modal">Ok, entendi</button>
          </div>
        </div>
      </div>
    </div>     
	</div>
</template>

<script>
import Vue from 'vue'
import router from '@/router'

const moment = require('moment')
require('moment/locale/br')

Vue.use(require('vue-moment'), {
    moment
})

export default {

  name: 'agendamento',
  props: ['endpoints', 'body', 'filter', 'dataAtendimento'],
  mounted() {
    var self = this;

    this.$store.dispatch('_doRequest', {
      method: 'POST', 
      endpoint: this.endpoints[0], 
      token: sessionStorage.getItem('token'),
      data: this.body
    }).then(response => {
        if(response.status === 200) {
          for (const [key, value] of Object.entries(response.data.object)) {
            if(self.body.idProfissional) {
              for (const [k, v] of Object.entries(value)) {
                self.hourlies.push({
                  date: k,
                  hourly: v.TODOS
                })                
              }
            } else {
              self.hourlies.push({
                date: key,
                hourly: value
              })
            }
          }          
        } 
    }, error => {
      return error
    }) 
  },
  data() {
    return {
      hourlies: [],
      schedule: '',
      date: '',
      modal: {
        success: false,
        confirm: {
          status: false,
          data: {
            day: '',
            hourly: '',
            date: ''
          }
        }
      }
    };
  },
  watch: {
    _date(v) {
      moment.locale('pt')

      let datefrm = moment(v, 'DD/MM/YYYY HH:mm')

      let date = datefrm.toDate()

      this.schedule = date
      this.modal.confirm.data.hourly = moment(date).format('HH:mm')
      this.modal.confirm.data.date = `${this.format(v, 'dayNumber')} de ${this.format(v, 'monthFullName')} de ${this.format(v, 'year')}`
      this.modal.confirm.status = !this.modal.confirm.status 
    }
  },
  computed: {
    _date() {
      return this.date
    }
  },
  methods: {
    format(date, style) {
      moment.locale('pt')

      let datefrm = moment(date, 'DD/MM/YYYY HH:mm')

      switch(style) {
        case 'dayName' :
          return moment(datefrm._d).format('ddd')
        case 'dayNumber' :
          return moment(datefrm._d).format('D')  
        case 'monthName' :
          return moment(datefrm._d).format('MMM')  
        case 'monthFullName' :
          return moment(datefrm._d).format('MMMM')            
        case 'monthNumber' :
          return moment(datefrm._d).format('MM') 
        case 'year' :
          return moment(datefrm._d).format('YYYY')  
        case 'hours' :
          return moment(datefrm._d).format('HH') 
        case 'minutes' :
          return moment(datefrm._d).format('mm')                                                            
        default :
          return false
      }
    },
    _doSetPeriod(period) {
      let el = document.querySelectorAll('[data-period]')

      for (var i = 0; i < el.length; i++) {
        if(period !== '') {
          if(el[i].dataset.period === period) {
            el[i].style.display = 'block'
          } else {
            el[i].style.display = 'none'
          }          
        } else {
          el[i].style.display = 'block'
        }
      }
    },
    _doSetSchedule() {
      moment.locale('pt')

      var self = this

      this.modal.confirm.status = !this.modal.confirm.status

      let date = new Date(this.schedule)
      let datefrm = moment(date).format('DD/MM/YYYY HH:mm')

      if(this.$router.history.current.params.reschedule) {
        this.$store.dispatch('_doRequest', {
          method: 'POST', 
          endpoint: `/integration/app-paciente/atendimento/reagendar`, 
          token: sessionStorage.getItem('token'),
          data: {
            "data": datefrm,
            "token": this.$router.history.current.params.tokenAtendimento, 
          }
        }).then(response => {
          let data = {
              title: response.status === 200 ? 'Sucesso' : 'Erro',
              text: (response.data.msg) ? response.data.msg : 'Atendimento reagendado com sucesso.'
          }
          self.$store.commit('modal', data) 

          if(response.status === 200) {
            self.$router.replace('/meus-atendimentos').catch(err => { return false })
          }
        }, error => {
          return error
        })         
      } else {
        this.$store.dispatch('_doRequest', {
          method: 'POST',
          endpoint: this.endpoints[1],
          token: sessionStorage.getItem('token'),
          data: {
            "dataHoraAgendamento": datefrm,
            "idProfissional": (this.body.idProfissional) ? this.body.idProfissional : null            
          }
        }).then(response => {
          if(response.status === 200) {
            self.modal.success = !self.modal.success

            if(response.data.object !== '') {
              localStorage.setItem('idAtendimento', response.data.object)
            }
          }
        }, error => {
          return error
        })
      }
    }
  }
};
</script>

<style lang="sass">
@import './sass/_style'
</style>