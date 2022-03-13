<template>
  <div id="app">
    <app-header v-if="$route.meta.header !== false" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/layout/BS-header'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style src="./assets/style/main.css"></style>
