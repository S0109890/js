<template>
  <div>
    <b-container id="review-section" fluid>
      <b-card id="data-card" header-tag="header" header-bg-variant="white" no-body class="overflow-hidden">
        <template #header>
          <b-row>
            <b-col
              ><h4 class="card-title" style="margin-bottom: 0">{{ storageInfo.title }}</h4></b-col
            >
            <b-col class="data-btn">
              <b-button size="sm" variant="primary" @click="onClickEdit()">수정</b-button>
              <b-button size="sm" variant="danger" @click="onClickDelete(storageInfo.id)">삭제</b-button>
            </b-col>
          </b-row>
        </template>
        <b-row no-gutters>
          <b-col md="1">
            <b-card-img :src="storageInfo.image" img-left alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col id="review-data" md="11">
            <b-card-body
              :title="storageInfo.isbn"
              :sub-title="`${storageInfo.author} | ${storageInfo.publisher} | ${storageInfo.price}원 | ${storageInfo.location} | 출간일: ${storageInfo.pubdate}`"
            >
              <b-card-text>
                {{ storageInfo.description }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

      <b-card id="review-card" no-body header-bg-variant="white">
        <template v-if="storageInfo.review" #header>
          <b-row>
            <b-col class="review-title"
              ><h5>{{ storageInfo.createdAt && storageInfo.createdAt.substring(0, 10) }}</h5></b-col
            >
            <b-col class="review-btn" cols="8">
              <b-button variant="danger" size="sm" @click="onClickReviewDelete(storageInfo.id)">삭제</b-button>
            </b-col>
          </b-row>
        </template>
        <b-row>
          <b-card-body>
            {{ storageInfo.review ? storageInfo.review : '도서 리뷰가 존재하지 않습니다.' }}
          </b-card-body>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storageInfo: {
        id: null,
        title: null,
        isbn: null,
        author: null,
        publisher: null,
        price: null,
        location: null,
        description: null,
        review: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Storage
    }
  },
  watch: {
    infoData(value) {
      this.storageInfo = { ...value }
    }
  },
  created() {
    this.storageInfo = { ...this.infoData }
  },
  methods: {
    onClickEdit() {
      // 1. 입력모드 설정
      this.$store.dispatch('actStorageInputMode', 'update')

      // 2. regi 페이지 이동
      this.$router.push('/regi')
    },

    onClickDelete(id) {
      // 1. 삭제 메시지 확인
      this.$bvModal.msgBoxConfirm('이 중고도서를 삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actStorageDelete', id)
          // 2. home 페이지 이동
          this.$router.push('/home')
        } else {
          return
        }
      })
    },

    onClickReviewDelete(id) {
      this.$bvModal.msgBoxConfirm('이 중고도서 리뷰를 삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actStorageReviewDelete', id)
        } else {
          return
        }
      })
    }
  }
}
</script>

<style src="../assets/style/components/bookcard.css"></style>
