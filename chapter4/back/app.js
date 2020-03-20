const express = require('express')  //node는 import가 아니라 require를 사용
const cors = require('cors')
const db = require('./models')
const app = express();      //express 함수 호출
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportConfig = require('./passport')
const session = require('express-session')
const cookie = require('cookie-parser')
const morgan = require('morgan')    // 정보 log 

// db.sequelize.sync({ force: true }) //변경된 내용 있으면 서버 재시작될 때 테이블 지워지고 새로 생성됨 
db.sequelize.sync() //db가 시작됨
passportConfig()


//미들웨어의 기능 : req, res 조작하는 것 (use : 미들웨어 )
app.use(morgan('dev'))
//모든 요청 다 허용 : app.use(cors())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))
//express는 기본적으로 json body를 못 받음. 
// 따로 선언해줘야함 
app.use(express.json()) // req body에 json 넣어준다
app.use(express.urlencoded({ extended: false }))  
app.use(cookie('cookiescret'))               //요청의  cookie를 해석해서 넣어줌 
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
        httpOnly:true,
        secure:false,
    }
}))
app.use(passport.initialize())
app.use(passport.session())     //session : 메모리. 사용자 로그인한 정보 저장
//use : get, post (요청, 응답) 등 조작해줌. 미들웨어 



//localhost:3085/ -> 생략가능하여 '/'만!
app.get('/', (req, res) =>{
    res.send('안녕 현주')
    //res.status(200).send('안녕 백엔드) -> status(200) 생략 : 통신 성공했을 떄 200
})

app.post('/user', async (req, res) => {
    try{
        const hash = await bcrypt.hash(req.body.password,12)  //bcrypt로 비밀번호 암호화 12는 암호화 안전도 (높을수록 안전 but 느려짐)
        const exUser = await db.User.findOne({      // db에서 email값 똑같은 user있는지 find
            where:{
                 email: req.body.email
            }
        })
        if(exUser) {    //이미 회원가입되어있으면
            return res.status(403).json({           // return 중요!! -> 응답은 한번만 보내야하기 때문에 여기서 return 안하면 script 쭉 실행됨;
                errorCode : 1,        //이는 front-back이 맞추기만 하면 됨 . 400대일 필요도 없고 아무런 규약 없음
                message : '이미 회원가입이 되어있습니다'
            })          // 1. 거절 코드(잘못된 요청) 보냄 (400대)  400: 잘못된 요청. 401 : 권한없음 403 : 금지 등    2. message도 담아서 뭔 내용인지 보내줌
        }
        const newUser = await db.User.create({
            email:req.body.email,
            password:hash,
            nickname:req.body.nickname,
        })
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                console.error(err)
                return next(err)
            }
            if(info) {
                return res.status(401).send(info.reason)
            }
            return req.logIn(user, async (err) => {
                if(err) {
                    console.error(err)
                    return next(err)
                }
                return res.json(user)
            })
        })
        //201 : 성공적으로 생성됨  (HTTP STATUS CODE)
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        return next(err)       //진짜 서버에서 error 났을 때 
    }
})

//login 하기
app.post('/user/login', (req, res, next) => {
    //email과 password 검사
    // 일치하면 session, cookie에 정보 저장 
    // front에 쿠키 내려보내주기
    // 이러한 세션 저장 및 쿠키 내려보내는 일련의 과정 굉장히 복잡하고 어렵. -> passport 사용하여 좀 더 쉽게 구현

    //localstretegy 실행이 됨. 직접 실행을 시켜줘야 함 저절로 안됨.
    passport.authenticate('local', (err, user, info) => { //(err, user, info) : done 콜백 함수의 return값이 세개. 에러.성공.실패 
        if(err) {
            console.error(err)
            return next(err)
        }
        if(info) {
            return res.status(401).send(info.reason)       //클라이언트에서 잘못된 요청을 한 것이기 때문에 거절. 틀린 이유도 send해줌
        }

        // req.login : 원래 있던거 아님. passport initalize에서 req에 login, logout 넣어줌. login의 역할 : 세션에 사용자 정보 넣어줌 (어떻게? : serializeUser)
        // 미들웨어의 기능 : req, res 조작하는 것
        // 세션에다 정보 저장 (어떻게?) -> serializeUser : 로그인할 때 한번 호출하여 값 저장( 사용자 id만)
        return req.login(user, async (err) => {
            //에러처리 
            if(err) {
                console.error(err)
                return next(err)    //front에도 err 정보 넘겨주기.
            }
            return res.json(user)   // body에 정보 담아 넘겨주기
        })  
    })(req, res, next)          
})


// 3085 : 포트
// 80 : http 
// 443 : https
app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중`);
    
})



//DB
//sequelize , mysql2 설치
// sequelize 왜 써요? : 자바스크립트로 sql 표현할 수 있음, db와 상관없이 같은 자바스크립트로 sql 표현 가능.
// mysql2 왜 설치 ? : DB설치한 거 아님( DB는 홈페이지에서 따로 받은 거). node와 mysql 이어주는 드라이버. 
