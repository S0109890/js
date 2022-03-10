# Metacamp-Bookscanner

- frontend, backend 폴더 내에서 npm ci 실행 > node_module 생성 확인

- pgAdmin4에서 meta_bookstore DB 생성 or DB connection 확인
- DBeaver에서 meta_bookstore, port 5432 연결되는지 확인
- 프로그램 끄면 connection도 끊어지니 끄지말고 실행하세요!
  위 두 항목을 모두 확인 하고 compose 실행해야 안정적으로 실행됩니다.

최상위 폴더에서 $ docker-compose up
ctrl+C 로 실행 취소하고 $ docker-compose down

pip freeze >> requirements.txt
pip install -r requirements.txt
python3 -m pip install -r requirements.txt

home - 어서오세요 ~~서점입니다. 들어가기

책장보기 /bookshelf
카드형태로 나오고 누르면 상세화면으로 전환 /bookshlef/해당서적

등록, 수정하기 /storage
해당 서적에 대해 리뷰를 작성하거나 수정할 때
모달 창으로 띄울 것인지?
