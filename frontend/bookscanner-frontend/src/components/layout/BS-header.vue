<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-brand href="#" @click="$router.push('/home')">Metaverse-Bookscanner</b-navbar-brand>
      <b-button v-if="$route.meta.write !== false" variant="primary" @click="$router.push('/regi')">도서 등록</b-button>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style src="../../assets/style/components/header.css"></style>
