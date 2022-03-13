import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Storage: {
    id: null,
    sNum: null,
    isbn: null,
    title: null,
    image: null,
    location: null,
    price: null,
    review: null,
    createdAt: null
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
    actStorageList(context, payload) {
      // Book card 리스트 렌더링 위한 테스트 데이터들입니다.
      // 추후 Back-end와의 API 연결 후 삭제합니다.
      console.log('actStorageList', payload)
      const storageList = [
        {
          sNum: 123456,
          title: '모든 국민은 거주·이전의 자유를 가진다.',
          review:
            '국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.'
        },
        {
          sNum: 789012,
          title: '모든 국민은 근로의 의무를 진다.',
          review: null
        },
        {
          sNum: 345678,
          title: '국가는 청원에 대하여 심사할 의무를 진다.',
          review:
            '지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다.'
        }
      ]
      context.commit('setStorageList', storageList)

      // RestAPI 호출
      // api
      //   .get('/serverApi/storage', { params: payload })
      //   .then(response => {
      //     const storageList = response && response.data
      //     context.commit('setStorageList', storageList)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    },

    // 중고도서 입력
    actStorageInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      // 중고도서 입력 위한 테스트 데이터들입니다.
      // 추후 Back-end와의 API 연결 후 삭제합니다.
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300)

      // RestAPI 호출
      // api
      //   .post('/serverApi/storage')
      //   .then(response => {
      //     const insertedResult = response && response.insertedId
      //     context.commit('setInsertedResult', insertedResult)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    },

    // 중고도서 정보 초기화
    actStorageInit(context, payload) {
      context.commit('setStorage', { ...stateInit.Storage })
    },

    // 입력모드 설정
    actStorageInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },

    // 중고도서 상세정보 조회
    actStorageInfo(context, payload) {
      console.log('actStorageInfo', payload)

      // 상태값 초기화
      context.commit('setStorage', { ...stateInit.Storage })

      // 수정 input 렌더링 위한 테스트 데이터들입니다.
      // 추후 Back-end와의 API 연결 후 삭제합니다.
      setTimeout(() => {
        const storageList = [
          {
            id: 1,
            sNum: 123456,
            isbn: '9788995432105',
            title: '모든 국민은 거주·이전의 자유를 가진다.',
            author: '문경주',
            publisher: 'Metaverse-Bootcamp',
            description:
              '저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 모든 국민은 통신의 비밀을 침해받지 아니한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.',
            location: '서울',
            price: 23000,
            review:
              '국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.',
            createdAt: '2021-12-01T00:00:00.000Z'
          },
          {
            id: 2,
            sNum: 789012,
            isbn: '9788995432112',
            title: '모든 국민은 근로의 의무를 진다.',
            author: '이승민',
            publisher: 'Metaverse-Bootcamp',
            description:
              '모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 사회적 특수계급의 제도는 인정되지 아니하며, 어떠한 형태로도 이를 창설할 수 없다. 국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.',
            location: '인천',
            price: 31000,
            review: null,
            createdAt: '2021-12-01T00:00:00.000Z'
          },
          {
            id: 3,
            sNum: 345678,
            isbn: '9788985001007',
            title: '국가는 청원에 대하여 심사할 의무를 진다.',
            author: '유지영',
            publisher: 'Metaverse-Bootcamp',
            description:
              '국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며, 국회의 의결은 재적의원 3분의 2 이상의 찬성을 얻어야 한다. 누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을 권리가 있음을 고지받지 아니하고는 체포 또는 구속을 당하지 아니한다. 체포 또는 구속을 당한 자의 가족등 법률이 정하는 자에게는 그 이유와 일시·장소가 지체없이 통지되어야 한다.',
            location: '부산',
            price: 28000,
            review:
              '지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다.',
            createdAt: '2021-12-01T00:00:00.000Z'
          }
        ]
        let storage = { ...stateInit.storage }
        for (let i = 0; i < storageList.length; i += 1) {
          if (payload === storageList[i].id) {
            storage = { ...storageList[i] }
          }
        }
        context.commit('setStorage', storage)
      }, 300)

      // RestAPI 호출
      // api
      //   .get(`/serverApi/storage/${payload}`)
      //   .then(response => {
      //     const storage = response && response.storage
      //     context.commit('setStorage', storage)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    },

    // 중고도서 수정
    actStorageUpdate(context, payload) {
      console.log('actStorageUpdate', payload)

      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      // 중고도서 수정 위한 테스트 데이터들입니다.
      // 추후 Back-end와의 API 연결 후 삭제합니다.
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300)

      // RestAPI 호출
      // api
      //   .put(`/serverApi/storage/${payload}`)
      //   .then(response => {
      //     const updatedResult = response && response.updatedCount
      //     context.commit('setUpdatedResult', updatedResult)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    },

    // 중고도서 삭제
    actStorageDelete(context, payload) {
      console.log('actStorageDelete', payload)

      // 상태값 초기화
      context.commit('setDeletedResult', null)

      // 중고도서 삭제 위한 테스트 데이터입니다.
      // 추후 Back-end와의 API 연결 후 삭제합니다.
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300)

      // RestAPI 호출
      // api
      //   .delete(`/serverApi/storage/${payload}`)
      //   .then(response => {
      //     const deletedResult = response && response.deletedCount
      //     context.commit('setDeletedResult', deletedResult)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    },

    // 중고도서 리뷰 삭제
    // 중고도서 수정과 같은 방식으로 작동합니다. (review column에 null 항목 추가)
    actStorageReviewDelete(context, payload) {
      console.log('actStorageReviewDelete', payload)

      // 상태값 초기화
      context.commit('setReviewDeleteResult', null)

      // 중고도서 리뷰 삭제 위한 테스트 데이터입니다.
      // 추후 Back-end와의 API 연결 후 삭제합니다.
      setTimeout(() => {
        const reviewDeletedResult = 1
        context.commit('setReviewDeletedResult', reviewDeletedResult)
      }, 300)

      // RestAPI 호출
      // api
      //   .put(`/serverApi/storage/${payload}`)
      //   .then(response => {
      //     const reviewDeletedResult = response && response.updatedCount
      //     context.commit('setReviewDeletedResult', reviewDeletedResult)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    }
  }
}
