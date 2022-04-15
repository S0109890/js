import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Storage: {
    id: null,
    isbn: null,
    title: null,
    author: null,
    publisher: null,
    review: null,
    link: null,
    location: null,
    price: null,
    createdAt: null,
    updateAt: null
  }
}

export default {
  state: {
    StorageList: [],
    Storage: { ...stateInit.Storage },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    ReviewDeletedResult: null, // 리뷰 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    StorageList: state => state.StorageList,
    Storage: state => state.Storage,
    StorageInsertedResult: state => state.InsertedResult,
    StorageUpdatedResult: state => state.UpdatedResult,
    StorageDeletedResult: state => state.DeletedResult,
    StorageReviewDeletedResult: state => state.ReviewDeletedResult,
    StorageInputMode: state => state.InputMode
  },
  mutations: {
    setStorageList(state, data) {
      state.StorageList = data
    },
    setStorage(state, data) {
      state.Storage = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setReviewDeletedResult(state, data) {
      state.ReviewDeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 중고도서 리스트 조회
    actStorageList(context) {
      // RestAPI 호출
      api
        .get('/serverApi/home')
        .then(response => {
          const storageList = response && response.data
          context.commit('setStorageList', storageList)
          console.log('초기리스트', storageList)
        })
        .catch(err => {
          console.error(err)
          context.commit('setStorageList', [])
        })
    },
    // // 중고도서 리스트 조회
    // actStorageList(context, payload) {
    //   // RestAPI 호출
    //   api
    //     .get('/serverApi/home', { params: payload })
    //     .then(response => {
    //       console.log('초기화:리스트불러오기')
    //       const storageList = response && response.data && response.data.rows
    //       context.commit('setStorageList', storageList)
    //     })
    //     .catch(err => {
    //       console.error(err)
    //       context.commit('setStorageList', [])
    //     })
    // },

    // 중고도서 입력
    actStorageInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      // RestAPI 호출
      api
        .post('/serverApi/regi', { ...payload, price: parseInt(payload.price) })
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
          console.log(payload)
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 중고도서 정보 초기화
    actStorageInit(context, payload) {
      context.commit('setStorage', { ...stateInit.Storage })
    },

    // 입력모드 설정
    actStorageInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },

    // 중고도서 상세정보 조회 검색
    actStorageInfo(context, payload) {
      console.log('검색 입력값, payload', payload.title)

      // 상태값 초기화
      context.commit('setStorage', { ...stateInit.Storage })

      // RestAPI 호출
      api
        .get(`/serverApi/home/${payload.title}`)
        .then(response => {
          const storage = response && response.data
          context.commit('setStorage', storage)
          // console.log('여기요여기', storage.rows[0])
          // console.log('여기요여기', storage.rows[1])
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 리뷰보기 onclickReview id 값 받아옴
    actStorageReview(context, payload) {
      console.log('b-card, payload:id', payload)

      // 상태값 초기화
      context.commit('setStorage', { ...stateInit.Storage })

      // RestAPI 호출
      api
        .get(`/serverApi/review/${payload}`)
        .then(response => {
          const storage = response && response.data
          context.commit('setStorage', storage)
          console.log('책(아이디) 정보받아오기', storage)
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 중고도서 수정
    actStorageUpdate(context, payload) {
      console.log('actStorageUpdate', payload)

      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      // RestAPI 호출
      api
        .put(`/serverApi/regi/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 중고도서 삭제
    actStorageDelete(context, payload) {
      console.log('actStorageDelete', payload)

      // 상태값 초기화
      context.commit('setDeletedResult', null)

      // RestAPI 호출
      api
        .delete(`/serverApi/review/${payload}`, payload)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 중고도서 리뷰 삭제
    // 중고도서 수정과 같은 방식으로 작동합니다. (review column에 null 항목 추가)
    actStorageReviewDelete(context, payload) {
      console.log('actStorageReviewDelete', payload)

      // 상태값 초기화
      context.commit('setReviewDeletedResult', null)

      // RestAPI 호출
      api
        .put(`/serverApi/review/${payload.id}`)
        .then(response => {
          const reviewDeletedResult = response && response.data && response.data.updatedCount
          context.commit('setReviewDeletedResult', reviewDeletedResult)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
