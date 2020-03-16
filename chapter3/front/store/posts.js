export const state = () => ({
    mainPosts:[],

    // for 인피니트 스크롤링 
    hasMorePost: true,
});


// 실무에서는 limit으로 안하고 last id 기반 (마지막으로 불러온 게시글 id 이후의 게시글 불러오는 방식)
const totalPosts = 41
const limit = 10

//virtualized list : 실제로 구현하기 매우 어려움. 이미 생성되어있는 라이브러리 사용 권장
// ex) vue-virtual-scroll-list (npm)
// 높이 알아내는 등 복잡한 내용이 많아서 강의에서는 사용 안함.
// 실무에서는 virtualized list로 구현하는 것이 좋음! 


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
        const diff = totalPosts - state.mainPosts.length //아직 안 불러온 게시글 수
        // 빈 배열 만들어서 더미 데이터 만들기
        const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({

            id:Math.random().toString(),
            User: {
                id: 1,
                nickname: '정현주',
            },
            content: 'Hello infinite scrolling~ '  + Math.random(),
            Comments: [],
            Images: [],

        }))
        state.mainPosts = state.mainPosts.concat(fakePosts)
        state.hasMorePost = fakePosts.length === limit
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