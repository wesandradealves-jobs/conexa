<template>
	<header>
	    <nav class="navbar navbar-expand-md navbar-light fixed-top desktop">
	      <div class="container">
	      	<conexa-logo :class="'navbar-brand'" />
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <!-- <a class="nav-link" href="javascript:void(0)" @click="$router.push('/home').catch(err => { return false })">Início <span class="sr-only">(current)</span></a> -->
                <router-link :class="'nav-link'" exact to="/home">Início</router-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="javascript:void(0)" @click="$router.push('/meus-atendimentos').catch(err => { return false })">Meus atendimentos</a> -->
                <router-link :class="'nav-link'" exact to="/meus-atendimentos">Meus atendimentos</router-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="javascript:void(0)" @click="$router.push('/duvidas').catch(err => { return false })">Dúvidas</a> -->
                <router-link :class="'nav-link'" exact to="/duvidas">Dúvidas</router-link>
              </li>
            </ul>
            <div class="profile">
              <div class="name">
                <img :src="($store.state.urlFoto) ? $store.state.urlFoto : user.urlFoto" alt="" class="photo">
                <p>{{user.nome}}</p>
                <div class="clearfix"></div>
              </div>
              <ul>
                <li>
                	<router-link :class="'nav-link'" exact to="/perfil">Meu Perfil</router-link>
                </li>
                <li @click="$store.commit('logout', true)"><a href="javascript:void(0)">Trocar Perfil</a></li>
                <li @click="$store.commit('logout', false)"><a href="javascript:void(0)">Sair</a></li>
              </ul>
            </div>
            <div class="clearfix"></div>
	      </div>

	    </nav>
	    <nav class="navbar navbar-expand-lg fixed-top navbar-light navbar-offcanvas mobile">
	      <div class="container">
	        <a class="navbar-brand mr-auto float-left" href="javascript:void(0)"><img src="static/img/logo-header.svg" alt=""></a>
	        <button class="navbar-toggler d-block float-right" @click="toggleMenu">
	          <div class="bar1"></div>
	          <div class="bar2"></div>
	          <div class="bar3"></div>
	        </button>
	        <div class="clearfix"></div>
	        <div v-show="this.opened" class="navbar-collapse offcanvas-collapse">
	          <div class="text-center profile">
	            <img :src="($store.state.urlFoto) ? $store.state.urlFoto : user.urlFoto" alt="" class="photo">
	            <p>{{user.nome}}</p>
	            <router-link :class="'nav-link'" exact to="/perfil">Meu Perfil</router-link>
	            <a @click="$store.commit('logout', true)" href="javascript:void(0)">Trocar Perfil</a>
	            <a @click="$store.commit('logout', false)" href="javascript:void(0)">Sair</a>
	          </div>
	          <ul class="nav navbar-nav mr-auto">
	            <li class="nav-item active">
	              <router-link :class="'nav-link'" exact to="/">Início</router-link>
	            </li>
	            <li class="nav-item">
	              <router-link :class="'nav-link'" exact to="/meus-atendimentos">Meus atendimentos</router-link>
	            </li>
	            <li class="nav-item">
	              <router-link :class="'nav-link'" exact to="/duvidas">Dúvidas</router-link>
	            </li>
	          </ul>
	        </div>
	      </div>
	    </nav>		
	</header>
</template>

<script>
import conexaLogo from '@/components/conexaLogo/conexaLogo.vue';

export default {

  name: 'appHeader',
  components: {
    conexaLogo
  },   
  beforeRouteEnter (to, from, next) {
    next(vm => {
      this.opened = false
    })
  },  
  watch: {
    $route(to, from) {
      this.opened = false 
    }
  },    
  data () {
    return {
    	user: (this.$router.history.current.params.user) ? this.$router.history.current.params.user : JSON.parse(sessionStorage.getItem('user')),
    	opened: false
    }
  },
  methods: {
  	toggleMenu(e) {
  		this.opened = !this.opened
  	}
  }
}
</script>

<style lang="css" scoped>
	#logo {
		margin-bottom: 0
	}
	.desktop.navbar-light .navbar-nav .active .nav-link{
		color: initial
	}
	.navbar-expand-md .navbar-nav .nav-link.router-link-exact-active{
		color: dodgerblue
	}
	.desktop .profile:hover,
	.desktop .profile ul{
		color: white;
		opacity: 1;
		background: dodgerblue
	}
	.desktop .profile .nav-link {
		padding: 0
	}
	.desktop .profile:hover ul{
		display: block
	}
	.desktop .profile:hover ul, .desktop .profile:hover *{
		color: white!important
	}
	.desktop .name p::after{
		border-color^:white
	}
	.desktop .profile:hover .name p::after{
		border-color: white transparent transparent transparent
	}
	.offcanvas-collapse{
		visibility: visible;
		position: absolute;
		bottom: initial;
		left: 0;
		right: initial;
		top: 100%;
		opacity: 1;
		z-index: 10;
		overflow: auto;
		height: calc(100vh - 61px);
	}
</style>