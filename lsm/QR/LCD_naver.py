import csv
import drivers
# import I2C_LCD_driver
from time import sleep

#naver api
CLIENT_ID = 'WEEJIGpgCSrz628DTDdw'
CLIENT_SECRET = '89KHsk1_Uy'

#LCD display
display = drivers.Lcd()
# display = I2C_LCD_driver.lcd()


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






if __name__ == "__main__":
    #csv first line only
    f = open('barcodes.csv', 'r', encoding='utf-8')
    rdr = csv.reader(f)
    for line in rdr:
        #search
        print(line[1])
        books = search_book(line[1])['items']

        #erro
        if(books == None):
            print("fail")
            exit()
        
        #print
        for book in books:
            print("title: " + book['title'])
            print("price: "+book["price"]+"won")
            try:
                while True:
                    # Remember that your sentences can only be 16 characters long!
                    print("Writing to display")
                    display.lcd_display_string(book['title'], 1)  # Write line of text to first line of display
                    display.lcd_display_string(book["price"]+"won", 2)  # Write line of text to second line of display
                    sleep(6)                                           # Give time for the message to be read
                    display.lcd_clear()                                # Clear the display of any data
                    sleep(2)                                           # Give time for the message to be read
            except KeyboardInterrupt:
                # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
                print("Cleaning up!")
    display.lcd_clear()
    f.close()
