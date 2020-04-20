<template>
    <div class="bg-degrade">
      <div class="container">
        <a href="javascript:void(0)" @click="$router.go(-1)" class="back"><span>Voltar</span></a>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li v-for="item in this.items"  class="breadcrumb-item">
              <a :href="item.path">{{item.name}}</a>
            </li>
            <li class="breadcrumb-item active" v-if="$router.history.current.meta.title.split('|')[1] !== ' '">
              <a href="javascript:void(0)">{{$router.history.current.meta.title.split('|')[1]}}</a>
            </li> 
          </ol>
        </nav>
        <div class="clearfix"></div>
      </div>
    </div>  
</template>

<script>
export default {

  name: 'breadcrumb',
  props: ['items'],
  data() {
    return {
    }
  }
}
</script>

<style lang="sass">
@import './sass/_style'
</style>