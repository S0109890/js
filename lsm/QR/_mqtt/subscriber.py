import paho.mqtt.client as mqtt

class Subscriber :
    def __init__ (self, on_message):
        self._set_client(on_message)

    def _set_client(self, on_message):
        # 새로운 클라이언트 생성
        self.client = mqtt.Client()
        # 콜백 함수 설정 on_connect(브로커에 접속), on_disconnect(브로커에 접속중료), on_subscribe(topic 구독),
        # on_message(발행된 메세지가 들어왔을 때)
        self.client.on_connect = self.on_connect
        self.client.on_disconnect = self.on_disconnect
        # client.on_subscribe = on_subscribe
        # message ##############
        self.client.on_message = on_message




    
    # The callback function. It will be triggered when trying to connect to the MQTT broker
    # client is the client instance connected this time
    # userdata is users' information, usually empty. If it is needed, you can set it through user_data_set function.
    # flags save the dictionary of broker response flag.
    # rc is the response code.
    # Generally, we only need to pay attention to whether the response code is 0.

    # 0: connection succeeded
    # 1: connection failed - incorrect protocol version
    # 2: connection failed - invalid client identifier
    # 3: connection failed - the broker is not available
    # 4: connection failed - wrong username or password
    # 5: connection failed - unauthorized
    # 6-255: undefined

    def on_connect(self, client, userdata, flags, rc):
    #connection check
        if rc == 0:
            print("connected OK")

        else:
            print("Bad connection Returned code=", rc)


    def on_disconnect(self,client, userdata, flags, rc=0):
        print(str(rc))
        

    def start(self):
        # address : localhost, port: 1883 에 연결
        self.client.connect('localhost', 1883)

        #subscribe : topic setting
        ########
        self.client.subscribe("raspberry/1",1)

        #loop
        self.client.loop_forever()

    def stop(self):
        #set the will message, when the raspberry pi is power off or network disconnect
        self.client.will_set('raspverry/1',b'{"status":"off"}')
        self.client.disconnect()


    def stop(self):
        self.client2.loop_stop()
        # 연결 종료
        self.client2.disconnect()

    def publish(self, data):
        # self.client2.loop_start()
        # common topic 으로 메세지 발행
        #토픽 ,메세지,012 qos
        self.client2.publish('rasp/1', data, 1)





