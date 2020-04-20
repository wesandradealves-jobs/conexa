<template>
	<div class="container preferencia">
      <h1>Tem preferência por algum profissional ou especialidade?</h1>
      <p class="txt-principal">Caso não tenha preferência, vamos indicar o melhor clínico geral para você</p>
      <div class="row">
        <div @click="$router.replace('/atendimento-agendado/agendamento-sem-preferencia').catch(err => { return false })" class="col-md-6 col-lg-3">
          <div class="box">
            <img src="/static/img/ico-sem-preferencia.svg" alt="">
            <h2>Não tenho<br> preferência</h2>
            <div class="clearfix"></div>
          </div>
        </div>
        <div @click="$router.replace('/atendimento-agendado/preferencia/especialidades').catch(err => { return false })" class="col-md-6 col-lg-3">
          <div class="box">
            <img src="/static/img/ico-busca-especialidade.svg" alt="">
            <h2>Buscar por<br> especialidades</h2>
            <div class="clearfix"></div>
          </div>
        </div>
        <div @click="$router.replace('/atendimento-agendado/preferencia/busca-profissional').catch(err => { return false })" class="col-md-6 col-lg-3">
          <div class="box">
            <img src="/static/img/ico-busca-nome.svg" alt="">
            <h2>Buscar pelo nome<br> do profissional</h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
export default {

  name: 'preferencia',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>