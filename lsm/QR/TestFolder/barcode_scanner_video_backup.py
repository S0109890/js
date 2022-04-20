from imutils.video import VideoStream
from pyzbar import pyzbar
import argparse
import datetime
import imutils
import time
import cv2

#argument parser
ap = argparse.ArgumentParser()
ap.add_argument("-o","--output",type=str,default="barcodes.csv",help="path to output CSV file containing barcodes")
args = vars(ap.parse_args())

#from there, initialize our video stream and open our CSV file
print("[INFO] starting video stream...")

#camera setting
resolution = (1920, 1080)

vs = VideoStream(usePiCamera=True,resolution=resolution,
                    framerate=24).start()

time.sleep(2.0)
print(vs)

#open output CSV file for writing and initialize the set of barcodes 
csv = open(args["output"],"w")
found = set()

#carturing + processing frame
#loop over the frames from video strea
while True:
    #frame
    frame = vs.read()
    frame = imutils.resize(frame, width = 1920)

    #barcode in frame and decode
    barcodes = pyzbar.decode(frame)

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
        else :
            # csv.write("{},{}\n".format(datetime.datetime.now(),barcodeData))
            # csv.flush()
            #print type , data to the terminal
            print("[INFO] Found {} barcode: {}".format(barcodeData,barcodeType))
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