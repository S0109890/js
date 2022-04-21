import paho.mqtt.client as mqtt

class Publisher:
    def __init__(self):
        self._set_client()

    def _set_client (self):
        # 새로운 클라이언트 생성
        self.client2 = mqtt.Client()
        # 콜백 함수 설정 on_connect(브로커에 접속), on_disconnect(브로커에 접속중료), on_publish(메세지 발행)
        self.client2.on_connect = self.on_connect
        self.client2.on_disconnect = self.on_disconnect
        self.client2.on_publish = self.on_publish
        print('init')


    def on_connect(self, client, userdata, flags, rc):
        #connection check ### 0 : connected
        if rc == 0:
            print("connected OK")
        else:
            print("Bad connection Returned code=", rc)


    def on_disconnect(self, client, userdata, flags, rc=0):
        print(str(rc))


    def on_publish(self, client, userdata, mid):
        print("In on_pub callback mid= ", mid)

    def start(self):
        # address : "192.168.43.158", port: 1883 에 연결
        self.client2.connect('localhost', 1883)
        self.client2.loop_start()
        print('mqtt_start')

    def stop(self):
        self.client2.loop_stop()
        # 연결 종료
        self.client2.disconnect()

    def publish(self, data):
        # self.client2.loop_start()
        # common topic 으로 메세지 발행
        #토픽 ,메세지,012 qos
        self.client2.publish('rasp/1', data, 1)
        print('topic : rasp/1')





