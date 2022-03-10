<template>
  <div>
    <b-container id="search-section" fluid>
      <b-input-group>
        <template #prepend>
          <b-dropdown text="Dropdown" variant="light">
            <b-dropdown-item>Action A</b-dropdown-item>
            <b-dropdown-item>Action B</b-dropdown-item>
          </b-dropdown>
        </template>

        <b-form-input></b-form-input>

        <template #append>
          <b-button variant="primary">검색</b-button>
        </template>
      </b-input-group>
    </b-container>

    <b-container id="card-section" fluid>
      <b-card-group deck>
        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </b-card-text>
          <b-button block variant="primary" class="card-btn">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text> This card has supporting text below as a natural lead-in to additional content. </b-card-text>
          <b-button block variant="primary" class="card-btn">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This card has
            even longer content than the first to show that equal height action.
          </b-card-text>
          <b-button block variant="primary" class="card-btn">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.
          </b-card-text>
          <b-button block variant="primary" class="card-btn">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text> This card has supporting text below as a natural lead-in to additional content. </b-card-text>
          <b-button block variant="primary" class="card-btn">리뷰 보기</b-button>
        </b-card>

        <b-card title="중고도서 제목" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This card has
            even longer content than the first to show that equal height action.
          </b-card-text>
          <b-button block variant="primary" class="card-btn">리뷰 보기</b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {}
</script>

<style src="../assets/style/components/bookcard.css"></style>
