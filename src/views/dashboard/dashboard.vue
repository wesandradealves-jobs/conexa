<template>
	<div>
      <watcher v-if="$store.state.watcher.status && $router.history.current.name !== 'escolha'" />
	    <app-header v-if="$route.meta.setHeader" />
	    <transition name="fade" mode="out-in">
	      <router-view />
	    </transition>	
	</div>
</template>

<script>
import appHeader from '@/components/appHeader/appHeader.vue';
import watcher from '@/components/watcher/watcher.vue';

export default {

  name: 'dashboard',
  components: {
    watcher,
    appHeader
  },  
  data () {
    return {

    }
  }
}
</script>

<style lang="sass">
</style>