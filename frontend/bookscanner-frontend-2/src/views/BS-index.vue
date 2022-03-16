<template>
  <div>
    <b-container id="search-section" fluid>
      <!-- search section -->
      <b-input-group>
        <template #prepend>
          <b-form-select v-model="selectSearch" text="검색 옵션" variant="light" :options="select"> </b-form-select>
        </template>

        <b-form-input
          v-model="searchInput"
          :placeholder="`검색할 도서의 ${selectSearch == 'title' ? '제목' : '저자'}명을 입력해주세요.`"
        ></b-form-input>

        <template #append>
          <b-button variant="primary" @click="searchStorageList(searchInput)">검색</b-button>
        </template>
      </b-input-group>
    </b-container>

    <!-- book list section -->
    <b-container id="card-section" fluid>
      <b-card-group deck>
        <!-- 임시 데이터 연결 위해 key 값을 임의로 index 지정하였기 때문에 함께 전송하는 파라미터 값에 1이 합산되어 보내집니다.(onClickReview)
        API 연결 후 자체 데이터 id 값으로 수정해야 합니다. -->
        <b-card v-for="item in storageList" :key="item.id" :title="item.title" img-alt="Image" img-top>
          <b-card-img v-for="item in naverData" :key="item.isbn" :src="item.image"></b-card-img>
          <b-card-text v-if="item.review">
            {{ item.review }}
          </b-card-text>
          <b-card-text v-if="!item.review" style="color: #6c757d; margin-bottom: 35.2px">
            등록된 리뷰가 없습니다.
          </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="onClickReview(item.id)">리뷰 보기</b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 제목 & 저자명 search 위한 변수들입니다.
      select: [
        { text: '제목', value: 'title' },
        { text: '저자', value: 'author' }
      ],
      selectSearch: 'title',
      searchInput: null
    }
  },
  computed: {
    storageList() {
      return this.$store.getters.StorageList
    },

    // 도서정보 제어 computed 입니다.
    insertedResult() {
      return this.$store.getters.StorageInsertedResult
    },
    updatedResult() {
      return this.$store.getters.StorageUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.StorageDeletedResult
    },

    // 상세정보 computed 입니다.
    naverData() {
      return this.$store.getters.Storage[1]
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메시지 출력
          this.$bvToast.toast('중고도서 등록이 성공하였습니다.', {
            title: '등록 성공',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재검색
          this.searchStorageList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('중고도서 등록이 실패하였습니다.', {
            title: '등록 실패',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리

      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메시지 출력
          this.$bvToast.toast('중고도서 정보 수정이 성공하였습니다.', {
            title: '수정 성공',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재검색
          this.searchStorageList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('중고도서 정보 수정이 실패하였습니다.', {
            title: '수정 실패',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리

      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메시지 출력
          this.$bvToast.toast('중고도서 정보 삭제가 성공하였습니다.', {
            title: '삭제 성공',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재검색
          this.searchStorageList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('중고도서 정보 삭제가 실패하였습니다.', {
            title: '삭제 실패',
            variant: 'success',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchStorageList()
  },
  methods: {
    searchStorageList(searchInput) {
      if (searchInput) {
        if (this.selectSearch === 'title') {
          this.$store.dispatch('actStorageList', { title: searchInput })
        }
        if (this.selectSearch === 'author') {
          this.$store.dispatch('actStorageList', { author: searchInput })
        }
      } else {
        this.$store.dispatch('actStorageList')
      }
    },

    onClickReview(id) {
      // 중고도서 상세정보
      this.$store.dispatch('actStorageInfo', id)
      this.$router.push('/review')
    }
  }
}
</script>

<style src="../assets/style/components/bookcard.css"></style>
