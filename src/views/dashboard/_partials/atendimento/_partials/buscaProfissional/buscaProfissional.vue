<template>
    <div class="container busca-nome">
      <h1>Busque {{ (this.idEspecialidade && !isNaN(this.idEspecialidade)) ? 'pela categoria' : 'pelo nome do profissional' }}</h1>
      <div v-if="!this.idEspecialidade || this.idEspecialidade && isNaN(this.idEspecialidade)" class="row">
        <div class="col-sm-7 col-md-6 col-lg-6">
          <div class="search-container">
            <input v-model="busca" @input="_doSearch" type="text" class="form-control" id="json-light-autocomplete" autocomplete="off" placeholder="Digite o nome">
            <span class="icon"><img src="/static/img/ico-search.svg" alt=""></span>
          </div>
        </div>

        <div class="col-sm-5 col-md-6 col-lg-6">
          <button @click="_doSearch" :disabled="busca === ''" type="button" name="button" class="bt-primary buscar">Buscar</button>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="row col-lg-12" v-if="(this.professionals.length > 0) && (isNaN(this.idEspecialidade) || this.busca)">
        <div class="container">
          <h2>{{this.professionals.length}} resultado(s) para "{{ this.idEspecialidade || this.busca }}"</h2>
        </div>
      </div>
      <div @click="$router.replace(`/atendimento-agendado/profissional/${professional.id}`).catch(err => { return false })" v-if="professionals.length" v-for="professional in professionals" class="box atendimento">
        <div class="row">
          <div class="col-sm-8">
            <img :src="professional.urlFoto" alt="" class="img-doctor">
            <div>
              <h6>{{professional.nome}}</h6>
              <p>{{professional.especialidade}} - {{ professional.tipoConselho + ' ' + professional.numeroConselho }}</p>
        <!--       <div class="rating">
               <input type="radio" name="rating" id="r1">
               <label for="r1"></label>

               <input type="radio" name="rating" id="r2">
               <label for="r2"></label>

               <input type="radio" name="rating" id="r3">
               <label for="r3"></label>

               <input type="radio" name="rating" id="r4">
               <label for="r4"></label>

               <input type="radio" name="rating" id="r5">
               <label for="r5"></label>

              </div> -->
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="col-sm-4">
            <a href="javascript:void(0)" class="float-right link-padrao">Ver perfil completo</a>
            <div class=" clearfix"></div>
          </div>
        </div>
      </div>
    </div>	
</template>

<script>
export default {

  name: 'buscaProfissional',
  props: ['idEspecialidade'],
  data () {
    return {
      professionals: [],
      token: sessionStorage.getItem('token'),
      busca: '',
      timeout: null
    }
  },
  mounted() {
    this._doSearch(this.idEspecialidade)
  },
  methods: {
    _doSearch(v) {
      var self = this

      this.professionals = []

      clearTimeout(this.timeout);

      self.timeout = setTimeout(function () {
        if(v) {
          window.history.replaceState({},'', (window.origin + '/atendimento-agendado/preferencia/busca-profissional' + '/' + ((v.target && v.target.value) ? v.target.value : v)))
          
          self.$store.dispatch('_doRequest', {
            method: 'POST',
            endpoint: !isNaN(v) ? '/integration/app-paciente/profissional/buscar/por/especialidade' : '/integration/app-paciente/profissional/buscar/por/nome',
            token: self.token,
            data: {
              nome: !isNaN(v) ? v : (v.target && v.target.value) ? v.target.value : v,
              idEspecialidade: !isNaN(v) ? v : ''
            }
          }).then(response => {
            if(response.data.object.length && response.status === 200) {
              self.professionals = response.data.object 
            } else {
              let data = {
                title: 'Busca',
                text: 'Nenhum resultado encontrado.'
              }
              self.$store.commit('modal', data)           

              self.busca = ''     
              window.history.replaceState({},'', (window.origin + '/atendimento-agendado/preferencia/busca-profissional'))
            }
          }, error => {
              return error
          })           
        }       
      }, 500);       
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
</style>