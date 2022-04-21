#mqtt import
import paho.mqtt.client as mqtt

class Subscribe :

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

    def on_connect(client, userdata, flags, rc):
    #connection check
        if rc == 0:
            print("connected OK")
            ########
            #subscribe : topic setting
            ########
            client.subscribe("raspberry/1")
        else:
            print("Bad connection Returned code=", rc)


    def on_disconnect(client, userdata, flags, rc=0):
        print(str(rc))


    # the callback function, it will be triggered when receiving messages
    def on_message(client, userdata, msg):
        print(str(msg.payload.decode("utf-8")))


    # 새로운 클라이언트 생성
    client = mqtt.Client()
    # 콜백 함수 설정 on_connect(브로커에 접속), on_disconnect(브로커에 접속중료), on_subscribe(topic 구독),
    # on_message(발행된 메세지가 들어왔을 때)
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    # client.on_subscribe = on_subscribe
    client.on_message = on_message

    #set the will message, when the raspberry pi is power off or network disconnect
    client.will_set('raspverry/1',b'{"status":"off"}')
    # address : localhost, port: 1883 에 연결
    client.connect('localhost', 1883)

    #loop
    client.loop_forever()
