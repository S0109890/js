import api from '../apiUtil'

// // 초기값 선언
// const stateInit = {
//   Storage: {
//     id: null,
//     isbn: null,
//     title: null,
//     author: null,
//     publisher: null,
//     review: null,
//     link: null,
//     location: null,
//     price: null,
//     createdAt: null,
//     updateAt: null
//   }
// }

// export default {
//   state: {
//     StorageList: [],
//     Storage: { ...stateInit.Storage },
//     InsertedResult: null, // 입력처리 후 결과
//     UpdatedResult: null, // 수정처리 후 결과
//     DeletedResult: null, // 삭제처리 후 결과
//     ReviewDeletedResult: null, // 리뷰 삭제처리 후 결과
//     InputMode: null, // 입력모드(등록: insert, 수정: update)
//     SelectOption: null // 검색 옵션 ( title, author, isbn)
//   },
//   getters: {
//     StorageList: state => state.StorageList,
//     Storage: state => state.Storage,
//     StorageInsertedResult: state => state.InsertedResult,
//     StorageUpdatedResult: state => state.UpdatedResult,
//     StorageDeletedResult: state => state.DeletedResult,
//     StorageReviewDeletedResult: state => state.ReviewDeletedResult,
//     StorageInputMode: state => state.InputMode,
//     StorageSelectOption: state => state.SelectOption
//   },
//   mutations: {
//     setStorageList(state, data) {
//       state.StorageList = data
//     },
//     setStorage(state, data) {
//       state.Storage = data
//     },
//     setInsertedResult(state, data) {
//       state.InsertedResult = data
//     },
//     setUpdatedResult(state, data) {
//       state.UpdatedResult = data
//     },
//     setDeletedResult(state, data) {
//       state.DeletedResult = data
//     },
//     setReviewDeletedResult(state, data) {
//       state.ReviewDeletedResult = data
//     },
//     setInputMode(state, data) {
//       state.InputMode = data
//     },
//     setSelectOption(state, data) {
//       state.SelectOption = data
//     }
//   },
//   actions: {
//     // 중고도서 리스트 조회
//     actStorageList(context, payload) {
//       console.log('actStorageList', payload)
//       // RestAPI 호출 //prams: 검색어
//       api
//         .get('/serverApi/home', { params: payload })
//         .then(response => {
//           const storageList = response && response.data && response.data.rows
//           console.log('초기 & 검색 리스트', response.data.rows)
//           console.log('초기리스트', storageList)

//           context.commit('setStorageList', storageList)
//         })
//         .catch(err => {
//           console.error(err)
//           context.commit('setStorageList', [])
//         })
//     },
//     // 중고도서 상세정보 조회 검색
//     actStorageInfo(context, payload) {
//       // 상태값 초기화
//       context.commit('setStorage', { ...stateInit.Storage })

//       // RestAPI 호출
//       if (payload !== undefined) {
//         let _option = Object.keys(payload)[0]
//         let _value = payload[Object.keys(payload)[0]]
//         console.log('store검색 입력값, option:', _option)
//         console.log('store검색 입력값, value:', _value)
//         api
//           .get(`/serverApi/home/${_option}/${_value}`)
//           .then(response => {
//             const storage = response && response.data
//             context.commit('setStorageList', storage.rows) // 리스트에 넣는다.
//             console.log('store검색 결과', storage.rows) // 책 하나의 정보들
//           })
//           .catch(err => {
//             console.error(err)
//           })
//       }
//     },
//     // 중고도서 입력
//     actStorageInsert(context, payload) {
//       // 상태값 초기화
//       context.commit('setInsertedResult', null)
//       console.log('책정보{}오브젝트로전송됨', payload)
//       // RestAPI 호출
//       api
//         .post('/serverApi/regi', payload)
//         .then(response => {
//           const insertedResult = response && response.data && response.data.id
//           context.commit('setInsertedResult', insertedResult)
//           console.log(payload)
//         })
//         .catch(err => {
//           console.error(err)
//         })
//     },

//     // 중고도서 정보 초기화
//     actStorageInit(context, payload) {
//       context.commit('setStorage', { ...stateInit.Storage })
//     },

//     // 입력모드 설정 : 등록 /수정
//     actStorageInputMode(context, payload) {
//       context.commit('setInputMode', payload)
//     },
//     // 검색 옵션  설정 : title author isbn
//     actStorageSelectOption(context, payload) {
//       console.log(payload)
//       context.commit('setSelectOption', payload)
//     },

//     // 리뷰보기 onclickReview id 값 받아옴
//     actStorageReview(context, payload) {
//       console.log('b-card, payload:id', payload)

//       // 상태값 초기화
//       context.commit('setStorage', { ...stateInit.Storage })

//       // RestAPI 호출
//       api
//         .get(`/serverApi/review/${payload}`)
//         .then(response => {
//           const storage = response && response.data
//           context.commit('setStorage', storage)
//           console.log('책(아이디) 정보받아오기', storage)
//         })
//         .catch(err => {
//           console.error(err)
//         })
//     },

//     // 중고도서 수정
//     actStorageUpdate(context, payload) {
//       console.log('actStorageUpdate', payload)

//       // 상태값 초기화
//       context.commit('setUpdatedResult', null)

//       // RestAPI 호출
//       api
//         .put(`/serverApi/regi/${payload.id}`, payload)
//         .then(response => {
//           const updatedResult = response && response.data && response.data.updatedCount
//           context.commit('setUpdatedResult', updatedResult)
//         })
//         .catch(err => {
//           console.error(err)
//         })
//     },

//     // 중고도서 삭제
//     actStorageDelete(context, payload) {
//       console.log('actStorageDelete', payload)

//       // 상태값 초기화
//       context.commit('setDeletedResult', null)

//       // RestAPI 호출
//       api
//         .delete(`/serverApi/review/${payload}`, payload)
//         .then(response => {
//           const deletedResult = response && response.data && response.data.deletedCount
//           context.commit('setDeletedResult', deletedResult)
//         })
//         .catch(err => {
//           console.error(err)
//         })
//     },

//     // 중고도서 리뷰 삭제
//     // 중고도서 수정과 같은 방식으로 작동합니다. (review column에 null 항목 추가)
//     actStorageReviewDelete(context, payload) {
//       console.log('actStorageReviewDelete', payload)

//       // 상태값 초기화
//       context.commit('setReviewDeletedResult', null)

//       // RestAPI 호출
//       api
//         .put(`/serverApi/review/${payload.id}`)
//         .then(response => {
//           const reviewDeletedResult = response && response.data && response.data.updatedCount
//           context.commit('setReviewDeletedResult', reviewDeletedResult)
//         })
//         .catch(err => {
//           console.error(err)
//         })
//     }
//   }
// }
