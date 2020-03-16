<template>
  <v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
      <v-textarea
        v-model="content"
        filled
        label="댓글 달기"
        :hide-details="hideDetails"
        :success="success"
        :success-messages="successMesseges"
        @input="onChangeTextarea"
         />
         <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
  </v-form>
</template>

<script>
export default {
    props:{
        postId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            valid:false,
            hideDetails:false,
            successMessages:'',
            success:false,
            content:''
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me
        },
        
    },
    methods: {
        // value : 게시글 쓸 때 현재 content가 들어감.
        // value가 있을 때는 기존의 메세지를 없애준다.
        onChangeTextarea(value) {
            if(value.length) {
                this.hideDetails = true
                this.success = false
                this.successMessages = ''
            }
        },
        onSubmitForm() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('posts/addComment', {
                    id: Date.now(),
                    postId: this.postId,
                    content: this.content,
                    User: {
                        nickname: this.me.nickname,
                    }
                })
                .then(() => {
                    this.content=''
                    this.success=true
                    this.successMessages='댓글이 작성되었습니다'
                    this.hideDetails=false

                })
                .catch(() => {

                })
            }
        }
    },

}
</script>

<style>

</style>