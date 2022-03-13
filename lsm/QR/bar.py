import cv2
import pyzbar.pyzbar as pyzbar
from playsound import playsound

data_list = []
used_codes = []

#import barcode data list
try:
    f = open("qrbarcode_data.txt", "r", encoding="utf8")
    data_list = f.readlines()
    print(data_list)
except FileNotFoundError:
    pass
else:
    f.close()


cap = cv2.VideoCapture(-1)


#data list to used_codes
for i in data_list:
    used_codes.append(i.rsplit('\n'))


while True:
    #camera
    success, frame = cap.read()

    if success:
        #barcode decode
        for code in pyzbar.decode(frame):
            #save image
            cv2.imwrite('qrbarcode_image.png', frame)
            my_code = code.data.decode('utf-8')
            if my_code not in used_codes:
                print("인식 성공 : ", my_code)
                playsound("barcode_beep.mp3")
                used_codes.append(my_code)

                f2 = open("qrbarcode_data.txt", "a", encoding="utf8")
                f2.write(my_code+'\n')
                f2.close()
            else:
                print("이미 인식된 코드입니다.!!!")
                playsound("barcode_beep.mp3")

        cv2.imshow('cam', frame)

        key = cv2.waitKey(1)
        if key == 27:
            break

cap.release()
cv2.destroyAllWindows()