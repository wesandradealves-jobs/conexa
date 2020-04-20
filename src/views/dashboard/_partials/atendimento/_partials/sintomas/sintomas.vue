<template>
   <div>
	<div class="container sintomas">
	  <h1>Marque abaixo os sintomas que você tem sentido</h1>
	  <div class="row">
	    <div class="col-md-6 col-lg-6">
	      <div class="search-container">
	        <input @input="_doSearch" type="text" class="form-control" id="json-light-autocomplete" autocomplete="off" placeholder="Filtre pelo sintoma">
	        <span class="icon"><img src="static/img/ico-search.svg" alt=""></span>
	      </div>
	    </div>
	  </div>
	</div>
	<hr>
	<div class="container sintomas">
	  <div class="row">
	    <div class="col-md-6 col-lg-4" v-for="sintoma in sintomas">
        <input :value="sintoma" v-model="sintomasEscolhidos" class="inp-cbx" :id="sintoma.id" type="checkbox" style="display: none;"/>
	      <label class="cbx" :class="sintoma.id.toLowerCase()" :for="sintoma.id">
	        <span>
	          <svg width="12px" height="10px" viewbox="0 0 12 10">
	            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
	          </svg>
	        </span>
	        <span><img :src="sintoma.imagem" alt=""> {{sintoma.descricao}}</span>
	      </label>
	    </div> 
	    <div class="col-12">
	      <button :disabled="!sintomasEscolhidos.length" @click="_doSubmit" type="button" name="button" class="bt-primary" data-toggle="modal" data-target="#prosseguir-sintoma">Prosseguir</button>
	    </div>
	  </div>
	</div>  
  <transition name="fade" mode="out-in">
    <div v-if="modal" class="modal fade bd-example-modal-lg" id="prosseguir-sintoma" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered prosseguir-sintoma" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Marque se alguns dos sintomas incomoda mais que os outros.</h5>
            <button @click="modal = !modal; sintomasIncomodam = []" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6 col-lg-4" v-for="sintoma in sintomasEscolhidos">
                  <input :value="sintoma" v-model="sintomasIncomodam" class="inp-cbx" :id="'incomoda_' + sintoma.id" type="checkbox" style="display: none;"/>
                  <label class="cbx" :class="'incomoda_' + sintoma.id.toLowerCase()" :for="'incomoda_' + sintoma.id">
                    <span>
                      <svg width="12px" height="10px" viewbox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </svg>
                    </span>
                    <span><img :src="sintoma.imagem" alt=""> {{sintoma.descricao}}</span>
                  </label>
                </div> 
              </div>            
            </div>
          </div>
          <div class="modal-footer">
            <a href="javascript:void(0)" @click="_doSubmit">Não, eles incomodam igual</a>
            <button @click="_doSubmit" type="button" class="btn btn-primary">Prosseguir</button>
          </div>
        </div>
      </div>
    </div>	
  </transition>
   </div>
</template>

<script>
export default {

  name: 'sintomas',
  beforeRouteEnter(to, from, next) {
    next(vm => {
    	let service = to.params.service || JSON.parse(sessionStorage.getItem('service'))
    	let sintomas = to.params.sintomas || JSON.parse(sessionStorage.getItem('sintomas'))
      let sintomasEscolhidos = to.params.sintomasEscolhidos || JSON.parse(sessionStorage.getItem('sintomasEscolhidos'))
      let sintomasIncomodam = to.params.sintomasIncomodam || JSON.parse(sessionStorage.getItem('sintomasIncomodam'))
      

    	vm.sintomas = sintomas 
      vm.sintomasEscolhidos = sintomasEscolhidos || []
      vm.sintomasIncomodam = sintomasIncomodam || [] 

    	if(!sintomas) {
    		next('/home')
    	}
    })    
  },
  data () {
    return {
      modal: false,
    	sintomas: [],
    	sintomasEscolhidos: [],
    	sintomasIncomodam: []
    }
  },
  methods: {
    _doSearch(term) {
      var term = term.target.value

      const filterBy = (term) => {
        const termLowerCase = term.toLowerCase()
        return (descricao) =>
          Object.keys(descricao)
            .some(prop => descricao[prop].toLowerCase().indexOf(termLowerCase) !== -1)
      }

      this.sintomas = (term) ? this.sintomas.filter(filterBy(term)) : JSON.parse(sessionStorage.getItem('sintomas')) 
    },    
    _doSubmit() {
      if(this.sintomasEscolhidos.length > 1) {
        this.modal = !this.modal

        if(!this.modal) {
          sessionStorage.setItem('sintomasEscolhidos', JSON.stringify(this.sintomasEscolhidos))
          sessionStorage.setItem('sintomasIncomodam', JSON.stringify(this.sintomasIncomodam))            
          this.$router.push({ name: 'medicamentos', params: { sintomasEscolhidos: this.sintomasEscolhidos, sintomasIncomodam: this.sintomasIncomodam } }).catch(err => { return false })   
        }  
      } else {
        sessionStorage.setItem('sintomasEscolhidos', JSON.stringify(this.sintomasEscolhidos))
        sessionStorage.setItem('sintomasIncomodam', JSON.stringify(this.sintomasIncomodam))          
        this.$router.push({ name: 'medicamentos', params: { sintomasEscolhidos: this.sintomasEscolhidos, sintomasIncomodam: this.sintomasIncomodam } }).catch(err => { return false })   
      }       
    }
  }
}
</script>

<style lang="css" scoped>
  .cbx span:last-child {
    background: none
  }
  .cbx img {
    height: 40px;
    position: absolute;
    top: 0;
    left: 0
  }
  .modal {
    opacity: 1;
    display: block;
    background: rgba(0,0,0,.35)
  }
  .modal-body .row [class*="col"] {
      flex: 0 0 50%;
      max-width: initial;
  }  
  .modal-footer .btn {
    margin-left: 10px 
  }
  .modal-body .row>div {
    margin-bottom: 0
  }
</style>