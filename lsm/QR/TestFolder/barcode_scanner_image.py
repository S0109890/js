from pyzbar import pyzbar
import argparse
import cv2

#
ap = argparse.ArgumentParser()
ap.add_argument("-i","--image", required=True, help="path to input image")
args = vars(ap.parse_args())

#load the input image
image = cv2.imread(args["image"])

#find the barcodes in the image and decode each of the barcodes
barcodes = pyzbar.decode(image)

#loop over the detected barcodes
for barcode in barcodes:
    #extrack the box location of the barcode and draw
    (x,y,w,h) = barcode.rect
    cv2.rectangle(image,(x,y),(x+w,y+h),(0,0,255),2)

    #barcode data is a bytes
    #convert it to a string first
    barcodeData = barcode.data.decode("utf-8")
    barcodeType = barcode.type

    #data,type in the image
    text = "{} ({})".format(barcodeData,barcodeType)
    cv2.putText(image,text,(x,y-10),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,255),2)

    #print type , data to the terminal
    print("[INFO] Found {} barcode: {}".format(barcodeData,barcodeType))

#show the output image
cv2.imshow("Image",image)
cv2.waitKey(0)