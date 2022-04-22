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
          <!-- <b-button variant="primary" @click="searchStorageList(searchInput)">검색</b-button> -->
          <b-button variant="primary" @click="onClickSearch(searchInput)">검색</b-button>
        </template>
      </b-input-group>
    </b-container>

    <!-- book list section -->
    <b-container id="card-section" fluid>
      <b-card-group deck>
        <b-card
          v-for="item in storageList"
          :key="item.id"
          :title="item.title"
          :img-src="item.image"
          img-alt="Image"
          img-top
        >
          <b-card-text v-if="item.review">
            {{ item.review }}
            <!-- {{ item.id }} -->
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
import mqtt from 'mqtt'

export default {
  data() {
    return {
      fields: [
        { key: 'id', label: 'id' },
        { key: 'isbn', label: 'ISBN' },
        { key: 'title', label: '제목' },
        { key: 'author', label: '저자' },
        { key: 'publisher', label: '출판사' },
        { key: 'review', label: '리뷰' },
        { key: 'link', label: '링크' },
        { key: 'location', label: '도서위치' },
        { key: 'price', label: '가격' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ],
      // 제목 & 저자명 search 위한 변수들입니다.
      select: [
        { text: '제목', value: 'title' },
        { text: 'ISBN', value: 'isbn' },
        { text: '저자', value: 'author' }
      ],
      selectSearch: 'title', //검색 옵션 : 제목검색
      searchInput: null, //검색어
      isMQTT: false, // mqtt에서 보낸값인가?
      mtopic: 'rasp/1', //토픽 설정
      mqttDataList: [] // mqtt를 통해 받은 데이터(리스트로 계속 추가됨)
    }
  },
  mounted() {
    this.createMqtt()
  },
  computed: {
    //값이 변하면 값을 반영함
    storageList() {
      return this.$store.getters.StorageList
    },
    storage() {
      return this.$store.getters.Storage
    },
    // 도서정보 제어 computed 입니다.
    insertedResult() {
      //중고 도서 등록 처리 후 결과 반영
      return this.$store.getters.StorageInsertedResult
    },
    updatedResult() {
      //중고 도서 정보 수정 후 처리 결과 반영
      return this.$store.getters.StorageUpdatedResult
    },
    deletedResult() {
      //중고도서 삭제 후 정보 처리 결과
      return this.$store.getters.StorageDeletedResult
    }
  },
  watch: {
    //모달이 열린 이후에 감지됨 : 컴퓨트에서 바뀐 값 계속 받아옴.
    // storage(value) {
    //   //리스트는 계속해서 불러와지는 중이다.
    // },
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
    // 최초 열릴때 감지됨
    this.init()
  },
  methods: {
    init() {
      console.log('처음페이지')
      // 2. 리스트 재검색
      this.searchStorageList()
    },
    onClickSearch(searchInput) {
      console.log(this.selectSearch)
      //검색하기
      if (!this.isMQTT) {
        if (this.selectSearch === 'title') {
          this.$store.dispatch('actStorageInfo', { title: searchInput })
        }
        if (this.selectSearch === 'author') {
          this.$store.dispatch('actStorageInfo', { author: searchInput })
        }
        if (this.selectSearch === 'isbn') {
          this.$store.dispatch('actStorageInfo', { isbn: searchInput })
        }
      } else {
        //isMQTT = true
        this.$store.dispatch('actStorageInfo', { isbn: searchInput })
        this.isMQTT = false
      }
      // 2. 리스트 재검색
      // this.searchStorageList()
    },

    onClickReview(id) {
      // 중고도서 상세정보 id = 입력인풋
      this.$store.dispatch('actStorageReview', id)
      this.$router.push(`/review`)
    },
    searchStorageList() {
      //리스트 불러오기
      this.$store.dispatch('actStorageList')
    },
    createMqtt() {
      // mqtt연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt연결 시 구독한다.
        const topic = this.mtopic // 구독할 topic
        console.log('connect')
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })
      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        const mqttData = JSON.parse(message) // json string으로만 받을 수 있음
        // 선택된 devicdId만 수용함
        this.mqttDataList.push(mqttData) // 리스트에 계속 추가함
        console.log('MQTTmessage : ', mqttData) //메세지 출력
        this.isMQTT = true //mqtt에서 보낸값
        this.onClickSearch(mqttData) //isbn 검색
      })
    }
  }
}
</script>

<style src="../assets/style/components/bookcard.css"></style>
