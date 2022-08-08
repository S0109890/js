<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-brand href="#" @click="$router.push('/home')">Metaverse-Bookscanner</b-navbar-brand>
      <b-button v-if="$route.meta.write !== false" variant="primary" @click="onClickAddNew">도서 등록</b-button>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    onClickAddNew() {
      console.log('o')
      // // 중고도서 신규등록

      // // 1. 입력모드 설정
      // this.$store.dispatch('actStorageInputMode', 'insert')

      // // 2. 상세정보 초기화
      // this.$store.dispatch('actStorageInit')

      // // 3. regi 페이지 이동
      // this.$router.push('/regi')
    }
  }
}
</script>

<style src="../../assets/style/components/header.css"></style>
