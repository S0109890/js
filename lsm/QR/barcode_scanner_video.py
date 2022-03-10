from imutils.video import VideoStream
from pyzbar import pyzbar
import argparse
import datetime
import imutils
import time
import cv2
from playsound import playsound
import numpy as np

def autocrop(image, threshold=0):
    """Crops any edges below or equal to threshold
    Crops blank image to 1x1.
    Returns cropped image.
    """
    if len(image.shape) == 3:
        flatImage = np.max(image, 2)
    else:
        flatImage = image
    assert len(flatImage.shape) == 2

    rows = np.where(np.max(flatImage, 0) > threshold)[0]
    if rows.size:
        cols = np.where(np.max(flatImage, 1) > threshold)[0]
        image = image[cols[0]: cols[-1] + 1, rows[0]: rows[-1] + 1]
    else:
        image = image[:1, :1]

    return image


#argument parser
ap = argparse.ArgumentParser()
ap.add_argument("-o","--output",type=str,default="barcodes.csv",help="path to output CSV file containing barcodes")
args = vars(ap.parse_args())
print(ap)
print(args)

#from there, initialize our video stream and open our CSV file
print("[INFO] starting video stream...")

#camera setting
resolution = (1296, 976)

vs = VideoStream(usePiCamera=True,resolution=resolution,
                    framerate=24).start()


time.sleep(2.0)

#open output CSV file for writing and initialize the set of barcodes 
csv = open(args["output"],"w")
found = set()

#bool _
isComplete = False

#carturing + processing frame
#loop over the frames from video strea
while True:
    #frame
    frame = vs.read()
    frame = imutils.resize(frame, width = 1200)

    #crop def
    crop = autocrop(frame,50)

    #barcode in frame and decode
    # barcodes = pyzbar.decode(frame)
    barcodes = pyzbar.decode(crop)


    #loop over the detected barcodes 
    for barcode in barcodes:
        #draw red box
        (x,y,w,h) = barcode.rect
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,0,255),2)

        #bype to text
        barcodeData = barcode.data.decode("utf-8")
        barcodeType = barcode.type

        #data , type on image
        text = "{} ({})".format(barcodeData,barcodeType)
        cv2.putText(frame,text,(x,y-10),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,255),2)

        #found = our CSV file
        if barcodeData not in found:
            csv.write("{},{}\n".format(datetime.datetime.now(),barcodeData))
            csv.flush()
            found.add(barcodeData)
            print("인식 성공 :",barcodeData)
            playsound("barcode_beep.mp3")
        else :
            # csv.write("{},{}\n".format(datetime.datetime.now(),barcodeData))
            # csv.flush()
            #print type , data to the terminal
            print("이미 인식된 코드 [INFO] Found {} barcode: {}".format(barcodeData,barcodeType))
            playsound("barcode_beep.mp3")
            isComplete= True
        break

    #close
    if isComplete:
        print("recognition complete")
        break
            
            

    #show output image
    cv2.imshow("Barcode Scanner",frame)
    key = cv2.waitKey(1) & 0xFF

    #q press loop break
    if key == ord("q"):
        break

#close the output CSV file do a bit of clean up
print("[INFO] cleaning up...")
csv.close()
cv2.destroyAllWindows()
vs.stop()