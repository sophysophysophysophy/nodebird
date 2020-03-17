// nuxt에 대한 설정을 담당 
// nuxt에 대한 기본적인 설정 ( head태그, 외부 라이브러리, 빌드할 때 압축법 등)
//
//vuetify연결도 여기서 처리 

module.exports = {
    //중복되는 정보 저장  
    head : {
        title: 'NodeBird',
    },
    modules:[
        '@nuxtjs/axios',
    ],
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    vuetify: {

    },
}