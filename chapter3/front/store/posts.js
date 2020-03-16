export const state = () => ({
    mainPosts:[],

    // for 인피니트 스크롤링 
    hasMorePost: true,
});

const limit

// mutations은 함수가 아니라 일반 객체로 만들어야 함
export const mutations = {
    addMainPost(state, payload) {
        //unshift : 맨 앞에 push
        state.mainPosts.unshift(payload)
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id)
        state.mainPosts.splice(index, 1)
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId)
        state.mainPosts[index].Comments.unshift(payload)
        // console.log(state.mainPosts[index].Comments);
    },
    loadPosts(state, payload) {
        // 빈 배열 만들어서 더미 데이터 만들기
        const fakePosts = Array(limit.fill().map(v=()=>({

            id:Math.random().toString(),
            User: {
                id: 1,
                nickname: '제로초',
            },
            content: 'Hello ~ ${Math.random()}',
            Comments: [],
            Images: [],

        }))
        
    }
};


export const actions = {
    //posts module 내부에서는 경로 안붙여도 됨. (같은 모듈 안에서는 안붙여도 되지만 다른 모듈에는 안됨)
    // commit('addMainPost', payload, {root : true}); :: index에 있는 함수 호출. default는 root : false 이기에 생략하는 것
    add({commit}, payload) {
        //서버에 게시글 등록 요청 보냄
        commit('addMainPost', payload);
    },
    remove({ commit }, payload) {
        commit('removeMainPost', payload);
    },
    addComment({ commit }, payload) {
        commit('addComment', payload);
    },
    loadPosts({ commit, state }, payload) {
        if(state.hasMorePost) {
            commit('loadPosts', payload)
        }
    }

}