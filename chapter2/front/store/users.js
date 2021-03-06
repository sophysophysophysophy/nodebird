export const state = () => ({
    me: null,
    followerList: [{nickname:'제로초', email:'1343@naver.com'},{nickname:'네초', email:'얌망@naver.com'},{nickname:'일초', email:'낄낄@naver.com'}],
    followingList: [{nickname:'제로초', email:'1343@naver.com'},{nickname:'네초', email:'얌망@naver.com'},{nickname:'일초', email:'낄낄@naver.com'}]
});


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
};

// context : 객체 {commit, dispatch, rootState, getters, rootGetters} 등으로 구성
// actions는 복합적 작업 가능. 동기/비동기 모두 가능. 고차원적 작업 가능
// actions에서도 최대한 mutations를 활용하는 이유는 기록하기 위해서!!! 
// actions는 기록이 되지 않지만 mutaions는 기록이 남음 
export const actions ={
    signUp({commit, state}, payload) {
        //서버에 회원가입 요청을 보내는 부분 
        commit('setMe', payload);
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
    }

};