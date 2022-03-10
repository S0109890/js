<template>
  <div>
    <b-container id="review-section" fluid>
      <b-card id="data-card" header-tag="header" header-bg-variant="white" no-body class="overflow-hidden">
        <template #header>
          <b-row>
            <b-col><h4 style="margin-bottom: 0">중고도서 제목</h4></b-col>
            <b-col class="data-btn">
              <b-button size="sm" variant="primary" @click="$router.push('/regi')">수정</b-button>
              <b-button size="sm" variant="danger">삭제</b-button>
            </b-col>
          </b-row>
        </template>
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img src="https://placekitten.com/380/200" img-left alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col id="review-data" md="8">
            <b-card-body title="ISBN 번호" sub-title="저자 | 출판사 | 출간일 | 판매가">
              <b-card-text>
                국회에 제출된 법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지 아니한다. 다만, 국회의원의
                임기가 만료된 때에는 그러하지 아니하다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을
                강요당하지 아니한다. 대통령은 제4항과 제5항의 규정에 의하여 확정된 법률을 지체없이 공포하여야 한다.
                제5항에 의하여 법률이 확정된 후 또는 제4항에 의한 확정법률이 정부에 이송된 후 5일 이내에 대통령이
                공포하지 아니할 때에는 국회의장이 이를 공포한다.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

      <b-card id="review-card" no-body header-bg-variant="white">
        <template #header>
          <b-row>
            <b-col class="review-title"><h5>리뷰 등록일</h5></b-col>
            <b-col class="review-btn" cols="8">
              <b-button variant="danger" size="sm">삭제</b-button>
            </b-col>
          </b-row>
        </template>
        <b-row>
          <b-card-body>
            대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의
            안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다. 국가는 노인과 청소년의
            복지향상을 위한 정책을 실시할 의무를 진다. 국가는 지역간의 균형있는 발전을 위하여 지역경제를 육성할 의무를
            진다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다. 대통령의 국법상 행위는 문서로써 하며, 이
            문서에는 국무총리와 관계 국무위원이 부서한다. 군사에 관한 것도 또한 같다. 원장은 국회의 동의를 얻어 대통령이
            임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 예비비는 총액으로 국회의 의결을 얻어야 한다.
            예비비의 지출은 차기국회의 승인을 얻어야 한다.
          </b-card-body>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {}
</script>

<style src="../assets/style/components/bookcard.css"></style>
