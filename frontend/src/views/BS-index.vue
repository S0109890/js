<template>
  <div>
    <h1>MQTT 테스트_home</h1>
    {{ mqttData }}
  </div>
</template>

<script>
import mqtt from 'mqtt'

export default {
  data() {
    return {
      isMQTT: false, // mqtt에서 보낸값인가?
      mtopic: 'rasp/1', //토픽 설정
      mqttDataList: [] // mqtt를 통해 받은 데이터(리스트로 계속 추가됨)
    }
  },
  mounted() {
    this.createMqtt()
  },
  // computed: {
  // },
  // watch: {
  //   //모달이 열린 이후에 감지됨 : 컴퓨트에서 바뀐 값 계속 받아옴.
  // },
  created() {
    // 최초 열릴때 감지됨
    this.init()
  },
  methods: {
    init() {
      console.log('처음페이지')
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
