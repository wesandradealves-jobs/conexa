 <template>
  <div
    class="wrap vertical-align"
    :class="[`${ ($route.name === 'PageNotFound' ? 'page-not-found' : ($route.name === 'login' || $route.name === 'esqueci-senha') ? 'login' : `login ${$route.name}` ) }`]"    
  >
    <transition name="fade" mode="out-in">
      <main>
        <router-view />
      </main>
    </transition>
    <app-footer />
    <md-dialog-alert
      :md-active.sync="$store.state.modal.isModal"
      :md-title="$store.state.modal.modalContent.title"
      :md-content="$store.state.modal.modalContent.text" />    
  </div>
</template>
<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueMaterial from 'vue-material'
import appFooter from '@/components/appFooter/appFooter.vue'

Vue.use(VueMaterial)
Vue.use(VueCookies)

export default {
  name: 'App',
  components: {
    appFooter
  }
}
</script>
<style lang="sass">
@import './_app'
</style>