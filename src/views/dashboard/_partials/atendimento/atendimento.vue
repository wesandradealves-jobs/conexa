<template>
	<div>
		<breadcrumb :items="breadcrumb" />
		<router-view />	
	</div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb/breadcrumb.vue';

export default {

  name: 'atendimento',
  components: {
    breadcrumb
  }, 
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.breadcrumb = vm.$route.meta.breadcrumb
    })
  },  
  watch: {
    $route(to, from) {
      this.breadcrumb = this.$route.meta.breadcrumb
    }
  },  
  data () {
    return {
      breadcrumb: []
    }
  }
}
</script>

<style lang="css" scoped>
</style>