<template>
    <div class="container especialidade">
      <h1>Escolha a especialidade</h1>
      <div class="row">
        <div class="col-sm-6 pr-diferent">
          <p class="txt-principal">Mais buscadas</p>

          <div @click="$router.push(`/atendimento-agendado/preferencia/busca-profissional/${especialidade.id}`)" v-for="especialidade in especialidades.top5especialidades" class="box d-flex justify-content-center">
            <div class="align-self-center">
              <img :src="especialidade.linkImagem" alt="">
              <div class="float-left">
                <h4>{{especialidade.nome}}</h4>
                <p>{{especialidade.descricao}}</p>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          
        </div>
        <div class="col-sm-6 pl-diferent">
          <p class="txt-principal">De A a Z</p>

          <div @click="$router.push(`/atendimento-agendado/preferencia/busca-profissional/${especialidade.id}`)" v-for="especialidade in especialidades.especialidades" class="box d-flex justify-content-center">
            <div class="align-self-center">
              <img :src="especialidade.linkImagem" alt="">
              <div class="float-left">
                <h4>{{especialidade.nome}}</h4>
                <p>{{especialidade.descricao}}</p>
              </div>
              <div class="clearfix"></div>
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

export default {

  name: 'especialidades',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.token = sessionStorage.getItem('token')

      if(!sessionStorage.getItem('especialidades')) {
    		let data = {
    			especialidades: [],
    			top5especialidades: []
    		}

	      function getEspecialidades() {
	        return vm.$store.dispatch('_doRequest', {
	          method: 'GET', 
	          endpoint: '/integration/app-paciente/clinica/listar/especialidades', 
	          token: vm.token
	        }).then(response => {
	          if(response.status === 200) {
	          	data.especialidades = response.data.object
	          }
	          return response
	        }, error => {
	          return error
	        })  
	      }   

	      function getTop5Especialidades() {
	        return vm.$store.dispatch('_doRequest', {
	          method: 'GET', 
	          endpoint: '/integration/app-paciente/clinica/listar/top5-especialidades', 
	          token: vm.token
	        }).then(response => {
	          if(response.status === 200) {
	          	data.top5especialidades = response.data.object
	          }
	          return response
	        }, error => {
	          return error
	        })         
	      }      	

	      axios.all([getEspecialidades(), getTop5Especialidades()])
	      .then(axios.spread(function () {
	        return true
	      })).finally(() => {
	      	sessionStorage.setItem('especialidades', JSON.stringify(data))
	      	vm.especialidades = JSON.parse(sessionStorage.getItem('especialidades'))
	      }); 
      } else {
        vm.especialidades = JSON.parse(sessionStorage.getItem('especialidades')) || []
      }
    })    
  },
  data () {
    return {
    	token: '',
    	especialidades: []
    }
  }
}
</script>

<style lang="css" scoped>
.align-self-center{
	width: 100%;
	display: flex; 
	flex-flow: row;
	justify-content: space-between;
	align-items: center;
}
.align-self-center img{
	flex: 0 0 auto 
}
.align-self-center .float-left{
	float: none;
	flex: 1
}
</style>