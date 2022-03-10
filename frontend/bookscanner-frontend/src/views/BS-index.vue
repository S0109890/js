<template>
  <div>
    <b-container id="search-section" fluid>
      <b-input-group>
        <template #prepend>
          <b-form-select v-model="selectSearch" text="검색 옵션" variant="light" :options="select"> </b-form-select>
        </template>

        <b-form-input
          v-model="searchInput"
          :placeholder="`검색할 도서의 ${selectSearch == 'title' ? '제목' : '저자'}명을 입력해주세요.`"
        ></b-form-input>

        <template #append>
          <b-button variant="primary">검색</b-button>
        </template>
      </b-input-group>

      selectSearch: {{ selectSearch }}, searchInput: {{ searchInput }}, select: {{ select }}
    </b-container>

    <b-container id="card-section" fluid>
      <b-card-group deck>
        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="$router.push('/review')">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text> This card has supporting text below as a natural lead-in to additional content. </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="$router.push('/review')">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This card has
            even longer content than the first to show that equal height action.
          </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="$router.push('/review')">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="$router.push('/review')">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text> This card has supporting text below as a natural lead-in to additional content. </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="$router.push('/review')">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This card has
            even longer content than the first to show that equal height action.
          </b-card-text>
          <b-button block variant="primary" class="card-btn" @click="$router.push('/review')">리뷰 보기</b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: [
        { text: '제목', value: 'title' },
        { text: '저자', value: 'author' }
      ],
      selectSearch: 'title',
      searchInput: null
    }
  }
}
</script>

<style src="../assets/style/components/bookcard.css"></style>
