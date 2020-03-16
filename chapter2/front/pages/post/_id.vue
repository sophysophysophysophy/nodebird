<template>
  <v-container v-if="post">
      <post-card :post="post" />
  </v-container>
  <div v-else>
      해당 아이디의 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'

export default {
    // 동적 라우팅
    // 해당 url로 바로 접근 가능 !
    // post/_id.vue
    // post/1   post/12     post/100    post (그냥 post만 해도 여기에 매칭 => 원하지 않는다면 _id directory 생성하여 그 안에다가 index.vue안에 넣으면 사용방법은 갖지만 post에는 매칭 x)
    components: {
        PostCard,
    },
    computed: {
        post() {
            //게시글 번호와 route.param.id와 같은게 잇는지 확인
            // 같은게 잇으면 뿌려주고 아니면 v-else
            return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10))
        }
    }

}
</script>

<style>

</style>