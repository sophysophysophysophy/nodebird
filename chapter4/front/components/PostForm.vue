<template>
  <v-card style="margin-bottom">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea 
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :success="success"
          :success-messages="successMessages"
          :rules="[v => !!v.trim() || '내용을 입력하세요']"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" color="green" absolute right>
          짹짹
        </v-btn>
        <v-btn>이미지 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            valid:false,
            hideDetails:false,
            successMessages:'',
            success:false,
            content:''
        }
    },
    computed: {
        // 첫번째 인자로 모듈명 지정 방법 : ...mapState(users, ['me'])
        // 모듈명 포함 루트 지정 방법  : ...mapState(['users/me'])
        // 뭐야.. 바뀌었나봐.. ;; -> state=>state.module명. state명

        // es5 
        // me: (function (state) {
        //   return state.users.me;
        // });        
        ...mapState({
          me:state => state.users.me,
        })
    },
    methods:{
        onChangeTextarea(value){
            // 한 글자라도 쓰면 밑의 작은 메세지 초기화 
            // 이전의 성공했던 상태 남아있으면 안됨.
            // detail : frontend 개발자가 갖춰야 할 점 : detail
            // 사용자 경험 향상시키는 깨알같은 디테일 
            if(value.length) {
              this.hideDetails=true
              this.success=false
              this.successMessages=''
            }

        },
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/add', {
                content:this.content,
                User : {
                    nickname:this.me.nickname
                },
                Comments : [],
                Images :[],
                id : Date.now(),
                createdAt: Date.now(),
                })
                .then(() => {
                    this.hideDetails = false;
                    this.success=true;
                    this.successMessages='게시글 등록 성공';
                    this.content=''
                    console.log(this.$store.state.posts);
                    
                })
                .catch(() => {

                })
            }
        }
    }
}
</script>

<style>

</style>