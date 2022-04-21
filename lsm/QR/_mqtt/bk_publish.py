import paho.mqtt.client as mqtt
import json

class Publish :
    def on_connect(client, userdata, flags, rc):
        #connection check ### 0 : connected
        if rc == 0:
            print("connected OK")
        else:
            print("Bad connection Returned code=", rc)


    def on_disconnect(client, userdata, flags, rc=0):
        print(str(rc))


    def on_publish(client, userdata, mid):
        print("In on_pub callback mid= ", mid)


    # 새로운 클라이언트 생성
    client2 = mqtt.Client()
    # 콜백 함수 설정 on_connect(브로커에 접속), on_disconnect(브로커에 접속중료), on_publish(메세지 발행)
    client2.on_connect = on_connect
    client2.on_disconnect = on_disconnect
    client2.on_publish = on_publish
    # address : "192.168.43.158", port: 1883 에 연결
    client2.connect('localhost', 1883)
    client2.loop_start()
    # common topic 으로 메세지 발행
    ##
    #토픽 ,메세지,012 qos
    client2.publish('rasp', "1234", 1)

    client2.loop_forever()
    # client2.loop_stop()
    # # 연결 종료
    # client2.disconnect()