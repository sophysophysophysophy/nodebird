export const state = () => ({
    mainPosts:[],
});



// mutations은 함수가 아니라 일반 객체로 만들어야 함
export const mutations = {
    addMainPost(state, payload) {
        //unshift : 맨 앞에 push
        state.mainPosts.unshift(payload);
    }
};


export const actions = {
    //posts module 내부에서는 경로 안붙여도 됨. (같은 모듈 안에서는 안붙여도 되지만 다른 모듈에는 안됨)
    // commit('addMainPost', payload, {root : true}); :: index에 있는 함수 호출. default는 root : false 이기에 생략하는 것
    add({commit}, payload) {
        //서버에 게시글 등록 요청 보냄
        commit('addMainPost', payload);
    }
}