import csv
import drivers
# import I2C_LCD_driver
from time import sleep
from dotenv import load_dotenv
import os
import sys
import urllib.request
import json
# from _mqtt import Subscriber
from _mqtt import Publisher

#dot env 
load_dotenv()
#naver api
CLIENT_ID = os.getenv('client_id')
CLIENT_SECRET = os.getenv('client_secret')

#LCD display
display = drivers.Lcd()
# display = I2C_LCD_driver.lcd()

#mqtt subscribe
# the callback function, it will be triggered when receiving messages
# def on_message( client, userdata, msg):
#     print(str(msg.payload.decode("utf-8")))


#request
def search_book(query):

    from urllib.request import Request, urlopen

    from urllib.parse import urlencode, quote

    import json



    # request = Request('https://openapi.naver.com/v1/search/book?query='+quote(query))
    #isbn
    request = Request('https://openapi.naver.com/v1/search/book_adv?d_isbn='+quote(query))

    request.add_header('X-Naver-Client-Id', CLIENT_ID)

    request.add_header('X-Naver-Client-Secret', CLIENT_SECRET)



    response = urlopen(request).read().decode('utf-8')

    search_result = json.loads(response)

    return search_result


def papago(book):
    client_id = "aUnwPIcv7XXaJ2FiPZqp" # 개발자센터에서 발급받은 Client ID 값
    client_secret = "fTz8WOpetl" # 개발자센터에서 발급받은 Client Secret 값
    encText = urllib.parse.quote(book)
    data = "source=ko&target=en&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request1 = urllib.request.Request(url)
    request1.add_header("X-Naver-Client-Id",client_id)
    request1.add_header("X-Naver-Client-Secret",client_secret)
    response1 = urllib.request.urlopen(request1, data=data.encode("utf-8"))
    rescode = response1.getcode()
    if(rescode==200):
        response_body = response1.read()
        #json 형 변환
        res = json.loads(response_body.decode('utf-8'))
        print(res['message']['result']['translatedText'])

        return res['message']['result']['translatedText']

    else:
        print("Error Code:" + rescode)


if __name__ == "__main__":
    #mqtt
    # subscriber = Subscriber(on_message)
    # subscriber.start()
    publisher = Publisher()
    publisher.start()
    #csv first line only
    f = open('barcodes.csv', 'r', encoding='utf-8')
    rdr = csv.reader(f)
    for line in rdr:
        #search
        print(line[1]) #line 1 , scond value : isbn
        publisher.publish(line[1])
        books = search_book(line[1])['items']
    
        #error
        if(books == None):
            print("fail")
            exit()
        
        #print
        for book in books:
            print("title: " + book['title'])
            print("price: "+book["price"]+"won")
            title = book['title']
            price = book["price"]+"won"
            papares= papago(title)
            try:
                while True:
                    # Remember that your sentences can only be 16 characters long!
                    print("Writing to display")
                    display.lcd_display_string(papares, 1)  # Write line of text to first line of display
                    display.lcd_display_string(book["price"]+"won", 2)  # Write line of text to second line of display
                    sleep(1)                                           # Give time for the message to be read
                    display.lcd_clear()                                # Clear the display of any data
                    sleep(1)                                           # Give time for the message to be read
            except KeyboardInterrupt:
                # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
                print("Cleaning up!")
    display.lcd_clear()
    f.close()

