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
    // post에 매칭되지 않기 위하여 _id 폴더 밑에 작성!
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