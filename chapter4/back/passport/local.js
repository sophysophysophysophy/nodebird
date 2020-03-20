const passport = require('passport')
const bcrypt = require('bcrypt')
const { Strategy: localStorage} = require('passport-local')
const db = require('../models')

// passport 전략을 가지고 로그인하면 됨 

module.exports = () => {
    passport.use(new localStorage({
        //검사하는 로직이 localstorage 안에서 이루어짐 
        usernameField: 'email', //req.body.email
        passwordField: 'password' //req.body.password
    },  async (email, password, done) => {      //done : callback함수
        try{
            const exUser = await db.User.findOne({
                where : { email }
            })
            if(!exUser) {
                return done(null, false, { reason : '존재하지 않는 사용자입니다'})          //에러, 성공, 실패
            }
            const result = await bcrypt.compare(password, exUser.password)          //일치하는지 비교해줌 (return값은 true or false)
            // const result = password === exUser.password
            if(result) {
                return done(null, exUser)  //에러 : null, 성공(exUser)  : 성공했다는 return 
            } else {
                console.log(result);
                
                return done(null, false, {reason : '비밀번호가 일치하지않습니다'})
            }
        } catch (err) {
            console.error(err)
            return done(err)
            
        }
    }))

}