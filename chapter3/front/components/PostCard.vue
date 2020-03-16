<template>
  <div style="margin-bottom: 20px">
    <v-card>
      <v-image />
      <v-card-text>
        <div>
          <h3>{{ post.User.nickname }}</h3>
          <nuxt-link :to="'/post/' + post.id">{{ post.content}}</nuxt-link>
        </div>
      </v-card-text>
      <v-card-action>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>  
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn text color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
      </v-card-action>
    </v-card>
    <template v-if="commentOpened">
      <comment-form :post-id="post.id"></comment-form>
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <h3>{{ c.User.nickname }}</h3>
            <div>{{ c.content }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script>
import CommentForm from '~/components/CommentForm';

export default {
  components: {
    CommentForm,
  },
  // props는 최대한 자세하게 작성해주는게 좋음
  props : {
    post : {
      type : Object,
      //부모로부터 선택적으로 받는냐 필수적으로 받느냐
      required: true,
    }
  },
  data() {
    return {
      commentOpened:false,
    }
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch('posts/remove', {
        id:this.post.id
      })
    },
    onEditPost() {

    },
    onToggleComment() {
      this.commentOpened = !this.commentOpened
    }
  }

}
</script>

<style>

</style>