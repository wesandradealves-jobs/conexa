<template>
	<div class="watcher" @click="(idProtocolo) ? _doCancel(false) : _doChamada()" :class="$store.state.watcher.class">
		<img :src="$store.state.watcher.content.img" alt="">
		<p v-html="$store.state.watcher.content.msg"></p>
	    <md-dialog-confirm
	      :md-active.sync="modal"
	      md-title="Deseja cancelar a solicitação de atendimento?"
	      md-content=""
	      md-confirm-text="Sim"
	      md-cancel-text="Não"
	      @md-cancel="_doCancel(false)"
	      @md-confirm="_doCancel(true)"
	      />   		
	</div>
</template>

<script>
export default {

  name: 'watcher',
  methods: {
  	_doChamada() {
  		var self = this;

  		let chamadaAtiva = JSON.parse(sessionStorage.getItem('chamadaAtiva'))
        
        self.$router.replace({
          name: 'chamadaAtendimento', 
        }).catch(err => { return false })
  	},
  	_doCancel(bool) {
  		var self = this
	  	
	  	this.modal = !this.modal

  		if(this.$store.state.watcher.type === 'atendimento') {
  			if(bool) {
		        this.$store.dispatch('_doRequest', {
		          method: 'GET', 
		          endpoint: `/integration/app-paciente/atendimento/cancelar/imediato/${sessionStorage.getItem('idProtocolo')}`, 
		          token: sessionStorage.getItem('token')        
		        }).then(response => {
		        	if(response.status !== 200) {
			            let data = {
			                title: 'Erro',
			                text: response.data.msg
			            }
			            self.$store.commit('modal', data) 	        		
		        	} else {
			            let data = {
			                title: 'Sucesso',
			                text: response.data.msg || 'Solicitação cancelada com sucesso.'
			            }
			            self.$store.commit('modal', data)    
			            self.$store.dispatch('_clearWatcher')         
		        	}
		        }, error => {
		            return error
		        })
  			}
  		} 
  	}
  },
  data () {
    return {
    	modal: false,
    	chamadaAtiva: (sessionStorage.getItem('chamadaAtiva')) ? true : false,
    	idProtocolo: (sessionStorage.getItem('idProtocolo')) ? true : false
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
.md-dialog-container, .md-dialog.md-theme-default
	height: auto 
	width: auto
</style>