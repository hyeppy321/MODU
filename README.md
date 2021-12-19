# <img width="25" alt="KakaoTalk_20211203_141000313" src="https://user-images.githubusercontent.com/66191091/146679394-75a30f16-2022-4ad6-825b-39181b01c5a6.png"> MODU 
<img width="800" alt="KakaoTalk_20211203_141000313" src="https://user-images.githubusercontent.com/66191091/146679291-c48873ed-e865-4e63-a732-d81ce1aea2e2.png">

- 공공데이터 청년인턴 해커톤 서비스 개발 부문 - <b>우수상🏆</b>

- MODU 는 위드 코로나 시대에,
해외 여행을 계획하는 <b>모두</b> 를 위해,
흩어져있는 정보를 <b>모두</b> 모아,
코로나 현황과 입출국정보 <b>모두</b> 를 제공합니다.

## Environment

Frontend
```
- npm version : 6.14.10
- react version : 16.8.4
```

Backend
```
- node version : 14.15.4
```

Database
```
- MongoDB
```

## How to Run
1. 프로젝트를 clone 합니다.

```
git clone https://github.com/hye-ppy/MODU.git
```

2. `config` 폴더 안에 `dev.js` 파일을 만들어주세요.


```
mkdir ./server/config/dev.js
```

3. `dev.js` 파일 안에 MongoDB 정보를 넣어주세요.

```
module.exports = {
    mongoURI:'mongodb+srv://<username>:<password>@boilerplate.agjuj.mongodb.net/<DBname>?retryWrites=true&w=majority'
}
```

4. 루트 디렉토리에서 `npm install`을 하세요. ( 콘솔에서 다음 명령을 실행하여 필요한 dependencies를 가져옵니다. )

```
npm install
```

5. `client` 디렉토리에서 `npm install`을 하세요. ( 콘솔에서 다음 명령을 실행하여 필요한 dependencies를 가져옵니다. )

```
cd ./client
npm install
```

<!--6. 공공데이터포털에서 아래 목록을 서비스 신청해서 api 인증키를 받아서 ~~에 등록해주세요.-->


## Contributors
- 배찬비 👉 [chanbi428](https://github.com/chanbi428)
- 이혜빈 👉 [hye-ppy](https://github.com/hye-ppy)
- 장영인 👉 [youngine](https://github.com/youngine)

## Development period
2021.11 ~ 2021.12
