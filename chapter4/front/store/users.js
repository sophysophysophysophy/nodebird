export const state = () => ({
    me: null,
    followerList: [],
    followingList: [],
    hasMoreFollowing: true,
    hasMoreFollower: true,
});

//for paginate : 실무에서는 이 방식보다 last id 사용!! 
const totalFollowers = 8
const totalFollowings = 6
const limit = 3


//state만 함수고 나머지는 객체 
// mutations은 함수가 아니라 일반 객체로 만들어야 함
//비동기 작업이 mutations에 있으면 안된다. (axios, setTimeout 등)
// 로그인, 회원가입, 댓글 작성 등 서버 쪽의 요청, 응답이 필수
// ajax = 비동기작업 = mutations에서 못함. = actions에서 동기적 작업 진행
export const mutations = {
    setMe(state, payload) {
        state.me=payload;
    },
    changeNickname(state, payload) {
        state.me.nickname=payload.nickname
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.email === payload)

        // es5
        // state.followerList.findIndex(function (param) {
        //     return param.email === 'dffd';
        //   });

        state.followerList.splice(index,1)
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.email === payload)
        state.followingList.splice(index,1)
    },
    loadMoreFollowers(state) {
        const diff = totalFollowers - state.followerList.length
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            nickname:Math.floor(Math.random()*1000),
            email:Math.floor(Math.random()*1000),
        }))
        state.followerList = state.followerList.concat(fakeUsers)
        state.hasMoreFollower = fakeUsers.length === limit
    },

    loadMoreFollowings(state) {
        const diff = totalFollowings - state.followingList.length
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            nickname:Math.floor(Math.random()*1000),
            email:Math.floor(Math.random()*1000),
        }))
        state.followingList = state.followingList.concat(fakeUsers)


        // 전체수가 limit의 배수일 때는 더보기 버튼이 활성화될 수밖에 없음. 이 방식의 한계
        // 예외처리해줄 수도 있지만 굳이...? 암튼 선택임!
        state.hasMoreFollowing = fakeUsers.length === limit
    }
};

// context : 객체 {commit, dispatch, rootState, getters, rootGetters} 등으로 구성
// actions는 복합적 작업 가능. 동기/비동기 모두 가능. 고차원적 작업 가능
// actions에서도 최대한 mutations를 활용하는 이유는 기록하기 위해서!!! 
// actions는 기록이 되지 않지만 mutaions는 기록이 남음 
export const actions ={
    signUp({commit, state}, payload) {
        //서버에 회원가입 요청을 보내는 부분 
        // console.log(this.$axios);
        //this.$axios.get('/'); //backend 서버에서 app.get('/') 과  매칭되는 것 
        // 이렇게 두는 주소 체계 = REST API : 지키는 회사는 많지안음. REST 비스무리한 API, HTTP API.
        this.$axios.post('http://localhost:3085/user', {    //back으로 요청보냄
            nickname:payload.nickname,
            email:payload.email,
            password:payload.password,
        }) 
        // header : 정해진 데이터만 넣을 수 있음 (형식) -> body에 담아서 많이 보냄 

        commit('setMe', payload)
    },
    logIn(context, payload) {
        context.commit('setMe', payload);
    },
    logOut(context){
        context.commit('setMe', null);
    },
    changeNickname({ commit }, payload) {
        commit('changeNickname', payload)
    },
    removeFollower({ commit },payload) {
        commit('removeFollower', payload)
    },
    removeFollowing({ commit },payload) {
        commit('removeFollowing', payload)
    },
    loadFollowers({commit, state}, payload){
       if(state.hasMoreFollower){
            commit('loadMoreFollowers')
       }
    },
    loadFollowings({commit, state}, payload){
        if(state.hasMoreFollowing){
             commit('loadMoreFollowings')
        }
     },

};