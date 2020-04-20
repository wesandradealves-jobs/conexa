<template>
	<div>
	    <div class="container atend-data">
	      <h1>Escolha uma data para o atendimento</h1>      
	    </div>
	    <hr>
	    <horarios
	    	:body="body"
	    	:filter="true" 
	    	:endpoints="['/integration/app-paciente/util/intervalo/data-disponivel', '/integration/app-paciente/atendimento/novo/agendado/sem-profissional']" />
	</div>
</template>

<script>
import store from '@/store'
import horarios from '@/components/horarios/horarios.vue'

export default {
  name: 'agendamento',
  data() {
    return {
    	body: {'dataBase': store.getters.formatDate(new Date())}
    };
  },
  components: {
  	horarios
  }
};
</script>

<style lang="css" scoped>
</style>
