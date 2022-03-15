<template>
  <div>
    <h1>MQTT 테스트</h1>
    {{ mqttData }}
  </div>
</template>

<script>
import { connect } from 'mqtt'

export default {
  data() {
    return {
      mqttTopic: 'rasp',
      mqttDataList: [] // mqtt를 통해 받은 데이터 (리스트로 계속 추가됨)
    }
  },
  created() {
    this.createMqtt()
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독한다.
        const topic = this.mqttTopic // 구독할 topic
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })

      // 메시지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        const mqttData = JSON.parse(message) // json string으로만 받을 수 있음
        this.mqttDataList.push(mqttData) // 리스트에 계속 추가함
        console.log(this.mqttDataList)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
