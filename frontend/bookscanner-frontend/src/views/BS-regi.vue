<template>
  <div>
    <b-container id="write-section" fluid>
      <h2 style="margin-bottom: 40px">도서 {{ inputMode }}</h2>
      <!-- inputMode check -->
      inputMode: {{ inputMode }}

      <b-form>
        <b-form-group
          label="ISBN 번호"
          label-for="book-isbn"
          description="등록할 도서의 ISBN 번호를 입력해주세요."
          :state="Boolean(book.isbn)"
        >
          <b-form-input
            id="book-isbn"
            v-model="book.isbn"
            type="text"
            placeholder="ISBN 번호를 입력해주세요."
            :state="Boolean(book.isbn)"
            :disabled="inputMode == '수정'"
          ></b-form-input>
        </b-form-group>

        <!-- input check -->
        <div class="mt-3">book.isbn: {{ book.isbn }}, isIsbnNull: {{ Boolean(book.isbn) }}</div>

        <b-form-group
          id="book-image"
          v-model="book.image"
          label="도서 이미지"
          label-for="book-image"
          :description="`${inputMode}할 도서의 이미지를 첨부해주세요.`"
        >
          <b-form-file
            :state="Boolean(book.image)"
            placeholder="도서 이미지를 첨부해주세요."
            drop-placeholder="도서 이미지를 끌어다 놔주세요."
          ></b-form-file>
        </b-form-group>

        <!-- input check -->
        <div class="mt-3">book.image: {{ book.image }}, isImageNull: {{ Boolean(book.image) }}</div>

        <b-form-group
          label="도서 리뷰"
          label-for="book-review"
          :description="`${inputMode}할 도서의 리뷰를 입력해주세요.`"
          :state="Boolean(book.review)"
        >
          <b-form-textarea
            id="book-review"
            v-model="book.review"
            type="text"
            :placeholder="book.review == null ? '리뷰가 존재하지 않습니다.' : '리뷰를 입력해주세요.'"
            rows="3"
            max-rows="6"
            no-resize
          ></b-form-textarea>
        </b-form-group>

        <!-- input check -->
        <div class="mt-3">book.review: {{ book.review }}, isReviewNull: {{ Boolean(book.review) }}</div>

        <b-button type="submit" variant="primary">도서 {{ inputMode }}</b-button>
        <b-button type="reset" variant="danger" @click="$router.push('/home')">{{ inputMode }} 취소</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        isbn: null,
        image: null,
        review: null
      },
      inputMode: '등록'
    }
  },
  computed: {
    // inputMode() {
    //   return '등록'
    // }
  }
}
</script>

<style lang="scss" scoped></style>
