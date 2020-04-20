<template>
 <div class="container detalhe-medico">
    <div class="row" v-if="profissional !== ''">
      <div class="col-md-3 text-center">
        <img :src="profissional.urlFoto" :alt="profissional.nome" class="img-fluid">
      </div>
      <div class="col-md-9">
        <h2>{{profissional.nome}}</h2>
        <p>{{profissional.nomeEspecialidade}} - {{profissional.conselho}}</p>
        <br/>
        <h6>Sobre mim</h6>
        <p v-html="profissional.sobre"></p>
        <h6>Informações acadêmicas</h6>
        <div class="container informacoes-academicas">
          <div class="row">
            <carousel
              :perPageCustom="[[320, 1],[568, 2]]" 
              :navigationEnabled="true"
              :paginationEnabled="false" 
              >
              <slide :key="qualificacao.nmeCurso" v-for="qualificacao in profissional.qualificacoes">
                <div class="carousel-inner">
                  <div class="slide-box">
                    <div id="bloco-1">
                      <span>{{qualificacao.anoFormacao}}</span>
                      <p>{{qualificacao.nomeCurso}}</p>
                      <p>{{qualificacao.nomeInstituicao}}</p>
                    </div>
                  </div>
                </div>
              </slide>
            </carousel>   
          </div>
        </div>
      </div>
      <hr>
      <h6 class="text-center col-lg-12">Horários disponíveis</h6>
      <horarios
        :body="body" 
        :dataAtendimento="dataAtendimento"
        :endpoints="['/integration/app-paciente/profissional/listar/disponibilidade', 
        '/integration/app-paciente/atendimento/novo/agendado']" />      
    </div>
  </div>	
</template>

<script>
import Vue from 'vue'
import { Carousel, Slide } from 'vue-carousel'
import store from '@/store'
import horarios from '@/components/horarios/horarios.vue'

const moment = require('moment')
require('moment/locale/br')

Vue.use(require('vue-moment'), {
    moment
})

export default {

  name: 'profissional',
  props: ['idProfissional'],
  beforeRouteEnter(to, from, next) {
    next(vm => {
    	var title = document.title
      var breadcrumb = to.meta.breadcrumb

      if(to.params.dataAtendimento) {
        vm.dataAtendimento = to.params.dataAtendimento
      }

  		vm.$store.dispatch('_doRequest', {
  			method: 'GET', 
  			endpoint: `/integration/app-paciente/profissional/detalhar/${vm.idProfissional}`, 
  			token: sessionStorage.getItem('token') 
  		}).then(response => {
  			if(response.status === 200) {
  				vm.profissional = response.data.object
  				
          document.title = title + ' ' + vm.profissional.nome

          if(!to.params.reschedule) {
            vm.$router.history.current.meta.breadcrumb.push({
              name: vm.profissional.nome,
              path: document.location.href
            })  
          }

          vm.body.idProfissional = vm.profissional.idProfissional
  			}
  		}, error => {
  		  return error
  		})  

    })    
  },  
  data() {
    return {
    	profissional: '',
      dataAtendimento: '',
      body: {
        idProfissional: '', 
        dataInicio: moment(new Date()).format("DD/MM/YYYY")
      }
    };
  },
  components: {
    horarios,
    Carousel,
    Slide
  }  
};
</script>

<style lang="sass">
@import './sass/_style'
</style>
