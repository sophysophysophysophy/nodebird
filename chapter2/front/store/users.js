export const state = () => ({
    me: null,
});


//state만 함수고 나머지는 객체 
// mutations은 함수가 아니라 일반 객체로 만들어야 함
//비동기 작업이 mutations에 있으면 안된다. (axios, setTimeout 등)
// 로그인, 회원가입, 댓글 작성 등 서버 쪽의 요청, 응답이 필수
// ajax = 비동기작업 = mutations에서 못함. = actions에서 동기적 작업 진행
export const mutations = {
    setMe(state, payload) {
        state.me=payload;
    }
};

//context : 객체 {commit, dispatch, rootState, getters, rootGetters} 등으로 구성
// actions는 복합적 작업 가능. 동기/비동기 모두 가능. 고차원적 작업 가능
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
    }
};