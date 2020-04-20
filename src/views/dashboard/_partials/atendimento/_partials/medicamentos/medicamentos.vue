<template>
	<div>
    <div class="container medicamento">
      <h1>Você toma algum medicamento?</h1>
      <p>Essa informação é muito importante, não deixe de preencher.</p>
      <div class="row">
        <div class="col-sm-12 col-lg-4">
          <autocomplete
          :class="'search-container'"
          :input-class="'form-control'"
          ref="autocomplete"
          placeholder="Digite o nome do medicamento"
          :request-headers="{'token':token}"
          :source="source"
          results-property="object"
          @selected="selectMedicine"
          :value="medicamentos.selected.nome"
          results-display="nome">
          </autocomplete>             
        </div>
        <div class="col-6 col-md-5 col-lg-3">
          <div class='ctrl'>
            <div @click="_doSetQti" class='ctrl-button ctrl-button-decrement'>-</div>
            <div class='ctrl-counter'>
              <input v-model="qti" class='ctrl-counter-input' maxlength='10' type='hidden' value='0'>
              <div class='ctrl-counter-num'>{{ qti }}</div>
            </div>
            <div @click="_doSetQti" class='ctrl-button ctrl-button-increment'>+</div>
          </div>
        </div>
        <div class="col-6 col-md-5 col-lg-3">
          <select v-model="periodicidade" name="sources" id="sources" class="custom-select sources" placeholder="ao dia">
            <option value="ao dia">ao dia</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2">
          <button @click="_doSetMedicine" type="button" name="button" class="btn btn-primary float-right">Incluir</button>
        </div>
      </div>
    </div>
    <hr>
    <div v-for="medicamento in medicamentos.group">
      <div class="container medicamento">
        <div class="row">
          <div class="col-5">
            <p>{{medicamento.data.nome}}</p>
          </div>
          <div class="col-7">
            <div class="float-right">
              <p>{{medicamento.qti}}</p>
              <p>{{medicamento.periodicidade}}</p>
              <a href="javascript:void(0)" @click="_doRemoveItem(medicamento.data.idMedicamento)" class="link-cancel">Excluir</a>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="container medicamento">
      <div class="bts">
        <a @click="_doSubmit" href="javascript:void(0)" class="link-padrao">Não tomo medicamentos</a>
        <button @click="_doSubmit" type="button" name="button" class="bt-primary buscar">Prosseguir</button>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Autocomplete from 'vuejs-auto-complete'

export default {

  name: 'medicamentos',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.token = sessionStorage.getItem('token')

      let medicamentosEscolhidos = JSON.parse(sessionStorage.getItem('medicamentosEscolhidos'))

      vm.medicamentos.group = medicamentosEscolhidos || []
    })    
  },
  components: {
    Autocomplete
  },   
  data () {
    return {
      token: '',
      medicamentos: {
        group: [],
        selected: []
      },
      timeout: null,      
      periodicidade: 'ao dia',
      qti: 0
    }
  },
  methods: {
    _doSubmit() {
        this.$refs.autocomplete.clear()
        this.qti = 0         
        sessionStorage.setItem('medicamentosEscolhidos', JSON.stringify(this.medicamentos.group))
        this.$router.push({ name: 'anexos', params: { medicamentosEscolhidos: this.medicamentos.group } }).catch(err => { return false }) 
    },
    _doRemoveItem(idMedicamento) {
      for( var i = 0; i < this.medicamentos.group.length; i++){ 
         if ( this.medicamentos.group[i].data.idMedicamento === idMedicamento) {
            this.medicamentos.group.splice(i, 1);
            sessionStorage.setItem('medicamentosEscolhidos', JSON.stringify(this.medicamentos.group))
            let data = {
              title: 'Sucesso',
              text: 'Removido com sucesso.'
            }
            this.$store.commit('modal', data)        
         }
      }   
      this.$refs.autocomplete.clear()
      this.qti = 0
    },
    _doSetMedicine() {
      var body = {
        data: this.medicamentos.selected,
        qti: this.qti, 
        periodicidade: this.periodicidade
      }

      if(this.qti === 0) {
        let data = {
          title: 'Erro',
          text: 'Você deve especificar uma quantidade.'
        }
        this.$store.commit('modal', data)         
      } else if (this.medicamentos.group.filter(e => e.data.nome === this.medicamentos.selected.nome).length <= 0) {
          this.medicamentos.group.push(body)
          sessionStorage.setItem('medicamentosEscolhidos', JSON.stringify(body))
      } else {
        let data = {
          title: 'Erro',
          text: 'Você já adicionou este medicamento.'
        }
        this.$store.commit('modal', data)        
      }    

      this.$refs.autocomplete.clear()
      this.qti = 0        
    },
    selectMedicine (group) {
      this.$refs.autocomplete.clear()
      this.medicamentos.selected = this.$refs.autocomplete.value = group.selectedObject
    },    
    source(input) {
      return process.env.VUE_APP_ROOT_API + '/integration/app-paciente/util/medicamento/buscar/' + input
    },    
    _doSetQti(e) {
      this.qti = (e.target.classList[1].indexOf('increment') > -1) ? this.qti+=1 : (this.qti > 0) ? this.qti-=1 : 0
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
</style>