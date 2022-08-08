<template>
  <div>
    <b-container id="notfound">
      <b-row>
        <b-col>
          <img src="../assets/img/error.png" alt="" />
        </b-col>
        <b-col style="margin-left: 20px">
          <h1>404</h1>
          <h5>Not Found</h5>
          <p>요청하신 페이지를<br />찾을 수 없습니다.</p>
          <b-button variant="primary" @click="$router.push('/home')">홈으로 돌아가기</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {}
</script>

<style src="../assets/style/components/notfound.css"></style>
