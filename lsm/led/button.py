import RPi.GPIO as GPIO #gpio라이브러르
import time     #sleep사용
 
GPIO.setmode(GPIO.BCM)  #gpio 모드 셋팅
 
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)       #Button 입력 GPIO23
GPIO.setup(24, GPIO.OUT)                                #LED 출력GPIO24
 
try:
        a=False
        while True:
                button_state = GPIO.input(23)   #버튼 상태 확인
                if button_state == False:       #눌러진상태면
                        if a:
                                a=False
                        else:
                                a=True
                if a:
                        GPIO.output(24, True)   #출력
                else:
                        GPIO.output(24, False)
                time.sleep(0.15)
except KeyboardInterrupt:       #ctrl-c 누를시
    GPIO.cleanup()
