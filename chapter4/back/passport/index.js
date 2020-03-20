const passport = require('passport')
const local = require('./local')

module.exports = () => {
    passport.serializeUser( (user,done) => {  //user.done : 메모리에 친구들 다 저장해놓으면 서버 터짐. 따라서 사용자의 아이디만 메모리에 저장
        return done(null, user.id)
    })
    passport.deserializeUser(() => {
        
    })
    local()

}