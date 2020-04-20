<template>
	<div>
	    <div class="container anexos-para-prof">
	      <h1>Envie anexos para o profissional</h1>
	      <p>Forneça resultados de exames, fotos de lesões corporais, etc.</p>
	      <div class="row">
	        <div class="col-lg-6">
	          <form>
	           <div id="carregarImg" class="buscar-arquivo search-container">
	             <div class="search-container">
	                <span class="icon"><img src="/static/img/ico-search.svg" alt=""></span>
	                <input v-on:change="_doGetFile" type="file" id="search" placeholder="Buscar arquivo no computador…" class="form-control">
	              </div>
	           </div>
	           <!-- this is your file input tag, so i hide it!-->
	           <!-- i used the onchange event to fire the form submission-->
	           <div style="height: 0px;width: 0px; overflow:hidden;"><input id="upfile" type="file" value="upload" onchange="sub(this)"></div>
	           <!-- here you can have file submit button or you can write a simple script to upload the file automatically-->
	           <!-- <input type="submit" value='submit' > -->
	         </form>
	        </div>
	        <div class="col-lg-4">
	          <input v-model="files.legenda" type="name" id="" class="form-control" placeholder="Descreva o teor do arquivo">
	        </div>
	        <div class="col-lg-2">
	          <button :disabled="!files.legenda && !files.selected.length" @click="_doSetFile" type="button" name="button" class="btn btn-primary float-right">Incluir</button>
	        </div>

	      </div>
	    </div>
	    <hr>
	    <div v-for="file in files.group">
		    <div class="container anexos-para-prof">
		      <div class="row">
		        <div class="col-7">
		          <p>{{file.legenda}}</p>
		        </div>
		        <div class="col-5">
		          <div class="float-right">
		            <a href="javascript:void(0)" @click="_doRemoveItem(file.idAnexo)" class="link-cancel">Excluir</a>
		          </div>
		        </div>
		      </div>
		    </div>
		    <hr>
	    </div>
	    <div class="container anexos-para-prof">
	      <div class="bts">
	        <a href="javascript:void(0)" @click="_doSubmit" class="link-padrao">Não tenho arquivos para anexar</a>
	        <button type="button" @click="_doSubmit" name="button" class="bt-primary buscar">Prosseguir</button>
	      </div>
	      <div class="clearfix"></div>
	    </div>
	    <transition name="fade" mode="out-in">
		    <div v-show="sent" class="modal fade bd-example-modal-lg" id="agend-realizado" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		      <div class="modal-dialog modal-dialog-centered agendamento-realizado" role="document">
		        <div class="modal-content">
		          <div class="modal-header">
		            <h5 class="modal-title" id="exampleModalLabel">Agendamento realizado!</h5>
		      <!--       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		              <span aria-hidden="true">&times;</span>
		            </button> -->
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
							<img src="/static/img/sucesso.svg" alt="">
		                </div>
		              </div>
		            </div>
		          </div>
		          <div class="modal-footer">
		            <button @click="_doResetAgendamento" type="button" class="btn btn-primary" data-dismiss="modal">Ok, entendi</button>
		          </div>
		        </div>
		      </div>
		    </div>	   
	    </transition> 
	</div>
</template>

<script>
var slugify = require('slugify')

export default {
  name: 'anexos',

  data () {
    return {
    	token: sessionStorage.getItem('token'),
    	sent: false,
    	files: {
    		legenda: '',
    		selected: [],
    		group: []
    	}
    }
  },
  methods: {
  	_doResetAgendamento() {
  		this.sent = !this.sent; 

		sessionStorage.removeItem('medicamentosEscolhidos')
		sessionStorage.removeItem('sintomasEscolhidos')
		sessionStorage.removeItem('sintomasIncomodam')
		sessionStorage.removeItem('sintomas')
		sessionStorage.removeItem('anexos')
		sessionStorage.removeItem('service')

		this.$router.replace('/home').catch(err => { return false }) 
  	},
  	_doSubmit(bool) {
  		var self = this 

  		if(sessionStorage.getItem('medicamentosEscolhidos') 
  			|| sessionStorage.getItem('sintomasEscolhidos') ||
  			sessionStorage.getItem('sintomasIncomodam')
  			)  {
			var medicamentosEscolhidos = JSON.parse(sessionStorage.getItem('medicamentosEscolhidos')).map(m => m.data.idMedicamento);
			var sintomasEscolhidos = JSON.parse(sessionStorage.getItem('sintomasEscolhidos')).map(m => m.descricao);
			var sintomasEvidentes = JSON.parse(sessionStorage.getItem('sintomasIncomodam')).map(m => m.descricao);  			
  		}

		var anexos = JSON.parse(sessionStorage.getItem('anexos'))
		var service = JSON.parse(sessionStorage.getItem('service'))

		var body = {
		  "anexos": anexos,
		  "medicamentos": (medicamentosEscolhidos) ? medicamentosEscolhidos : null,
		  "sintomas": (sintomasEscolhidos) ? sintomasEscolhidos : null,
		  "sintomasEvidentes": (sintomasEvidentes) ? sintomasEvidentes : null,
		  "tipoProfissional": service.id
		}

		self.$store.dispatch('_doRequest', {
		  method: 'POST',
		  endpoint: '/integration/app-paciente/atendimento/novo/imediato',
		  token: sessionStorage.getItem('token'),
		  data: body
		}).then(response => {
			if(response.status === 200) {
				self.sent = !self.sent
				
				sessionStorage.setItem('idProtocolo', response.data.object)
			}
		}, error => {
		  return error
		})  		
	},
  	_doRemoveItem(idAnexo) {
      for( var i = 0; i < this.files.group.length; i++){ 
         if ( this.files.group[i].idAnexo === idAnexo) {
            this.files.group.splice(i, 1);

            sessionStorage.setItem('anexos', JSON.stringify(this.files.group))

            let data = {
              title: 'Sucesso',
              text: 'Removido com sucesso.'
            }
            this.$store.commit('modal', data)        
         }
      }   
      let input = document.getElementById('search')
      input.value = this.files.legenda = ''
  	},
  	_doSetFile(e) {
		if (this.files.group.filter(e => e.idAnexo === this.files.selected.idAnexo).length <= 0) {
			if(!this.files.legenda) {
		        let data = {
		          title: 'Erro',
		          text: 'Você deve informar o teor do arquivo.'
		        }
		        this.$store.commit('modal', data)  
			} else {
				  this.files.selected.legenda = this.files.legenda
				  this.files.group.push(this.files.selected)
				
				  sessionStorage.setItem('anexos', JSON.stringify(this.files.group))
			}
		 } else {
	        let data = {
	          title: 'Erro',
	          text: 'Você já adicionou este arquivo.'
	        }
	        this.$store.commit('modal', data)      
		 }
      let input = document.getElementById('search')
      input.value = this.files.legenda = ''		
  	},
  	_doGetFile(e) {
		const image2base64 = require('image-to-base64')

		var self = this 
		var file = e.target.files[0];
		var url = URL.createObjectURL(file) 
		var idAnexo = slugify(file.name.replace(`.${ext}`, ''), {
			replacement: '_',    
			remove: /[*+~.()'"!:@]/g,      
			lower: true,     
		})      

		var ext = file.type.split('/')[1]

      	self.files.selected = file

      	image2base64(url) 
          .then(
              (response) => {
                let body = {
			      conteudoBase64: response,
			      idAnexo: idAnexo,
			      nomeExtensao: ext,
                }       

                self.files.selected = body  
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

<style lang="css" scoped>
	.modal{
		display: block;
		opacity: 1;
		background: rgba(0,0,0,.35)
	}
	.modal-footer {
		padding-top: 25px
	}
	.modal img {
		width: 100%;
		height: auto
	}
</style>