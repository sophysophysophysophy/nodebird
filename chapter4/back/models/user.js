
//sequelize, DataTypes를 매개변수로 가지는 함수를 모듈로 생성 
module.exports = (sequelize, DataTypes)=> {
    //User라는 테이블을 만들거임.(정확히는 모델명)
    //sequelize 모델 : 구조를 정확히 정의해주어야 함.
    //스키마. 모델의 정의 바꾸면 자동으로 변경되지 않음. force :true로 하고 서버 재시작하면 기존 데이터 다 날라가고 새로운 테이블 만들어줌 
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(30),
            allowNull:false,
            unique : true ,     // 중복금지  
        },
        nickname: {
            type:DataTypes.STRING(40),
            allowNull:false,
        },
        password: {
            type:DataTypes.STRING(100),
            allowNull:false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'  //한글 저장을 위해 
    })
    User.associate = (db) => {

    }
    return User
}