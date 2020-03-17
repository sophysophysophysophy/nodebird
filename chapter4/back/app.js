const express = require('express')  //node는 import가 아니라 require를 사용
const db = require('./models')
const app = express();      //express 함수 호출

db.sequelize.sync() //db가 시작됨

//express는 기본적으로 json body를 못 받음. 
// 따로 선언해줘야함 
app.use(express.json()) // req body에 json 넣어준다
app.use(express.urlencoded({ extended: false }))  

//use : get, post 등 조작해줌. 미들웨어 



//localhost:3085/ -> 생략가능하여 '/'만!
app.get('/', (req, res) =>{
    res.send('안녕 현주')
    //res.status(200).send('안녕 백엔드) -> status(200) 생략 : 통신 성공했을 떄 200
})

app.post('/user', async (req, res) => {
    try{
        const newUser = await db.User.create({
            email:req.body.email,
            password:req.body.password,
            nickname:req.body.nickname,
        })
        //201 : 성공적으로 생성됨  (HTTP STATUS CODE)
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err);
        next(err)
        
    }
})



// 3085 : 포트
// 80 : http 
// 443 : https
app.listen(3085, ()=>{
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중`);
    
})



//DB
//sequelize , mysql2 설치
// sequelize 왜 써요? : 자바스크립트로 sql 표현할 수 있음, db와 상관없이 같은 자바스크립트로 sql 표현 가능.
// mysql2 왜 설치 ? : DB설치한 거 아님( DB는 홈페이지에서 따로 받은 거). node와 mysql 이어주는 드라이버. 
