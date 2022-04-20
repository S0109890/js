import csv

#naver api
CLIENT_ID = '000'
CLIENT_SECRET = '000'


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

            # print(book)
            print("title: " + book['title'])
            print("price: "+book["price"]+"won")
    f.close()