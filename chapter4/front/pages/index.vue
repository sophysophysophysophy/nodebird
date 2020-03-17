<template>
  <div>
    <post-form v-if="me" />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p"/>
    </div>
  </div>
</template>

<script>
// dx : developer experience. 개발자들이 개발하기 편한 환경 
// 수백만개 파일을 하나로 줄일 수 있는 방법 알려줌.
// vue 라우터를 사용할 떄는 실제로 페이지 하나인데 컴포넌트 수백만개를 서로 바꿔가면서 눈속임
// -> 따라서 모든 컴포넌트가 로딩된 후 페이지 볼 수 있음 : 성능에 문제 (몇몇 컴포넌트만 볼 때)
// nuxt : 눈속임 아님. 실제로 개별적인 페이지들. (code splitting )
// 별개의 페이지로 구성된 nuxt는 로딩할 페이지들만 로딩하기 때문에 효율적
// 페이지 넘어갈 때 깜빡임 (vue는 이를 없애기 위해 한번에 로딩)
// code splitting : 다음에 갈 확률이 높은 페이지들 미리 불러옴 -> 페이지 깜빡임없이 넘어감 (앱처럼) : ux
// nuxt : code splitting + ux 까지 신경 쓴 프레임워크
import PostCard from '~/components/PostCard'
import PostForm from '~/components/PostForm'
export default {
    components: {
        PostCard,
        PostForm
    },

    //fetch : 컴포넌트가 마운도되기 전에 (화면에 보여지기 전에) 
    // store에 비동기적으로 데이터를 넣을 때 사용!
    // 화면이 로딩되기 전에 화면에 보여줘야 하는 데이터가 이미 서버에서 불려와질 수 있도록
    // 보통 store에서 미리 데이터를 준비해놓음.
    fetch({store}) {
      store.dispatch('posts/loadPosts')
    },
    //lifecycle
    mounted() {
      // window : created에서 사용 불가. mounted에서 사용해야함
      // mounted : 화면에 붙었다. 그 전에 window나 document에 접근하면 에러날 확률 높음
      // for infinite scrolling 
      window.addEventListener('scroll', this.onScroll)
    },

    //created에서 생성을 했으면 반드시 beforeDestroy에서 제거 (메모리 누수 방지)
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    },
    computed:{
      me : function() {
          return this.$store.state.users.me
      },
      // me(){
      //   return this.$store.state.users.me
      // },
      mainPosts() {
        return this.$store.state.posts.mainPosts
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost
      }
    },
    methods: {
      onScroll(){
        // infinite scrolling을 하려면 
        if(window.scrollY + document.documentElement.clientHeight >
              document.documentElement.scrollHeight - 300) {
                if(this.hasMorePost) {
                  this.$store.dispatch('posts/loadPosts')
                }
        }
      },
    }

}
</script>

<style>

</style>