<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field v-model="email" :rules="emailRules" label="이메일" type="email" required />
            <v-text-field v-model="password" :rules="passwordRules" label="비밀번호" type="password" required />
            <v-text-field v-model="passwordCheck" :rules="passwordCheckRules" label="비밀번호 확인" type="password" required />
            <v-text-field v-model="nickname" :rules="nicknameRules" label="닉네임" type="nickname" required />
            <v-checkbox v-model="terms" :rules="[v => !!v || '약관에 동의해주십시오.' ]" label="정현주의 말을 잘 들을 것을 약속합니다." required />
            <v-btn color="green" type="submit">
              가입하기
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
    data() {
      return {
        valid : false,  //회원가입을 누를 수 있는지 없는지 : vuetify에서 자동으로 기능 해줌
        email: '',
        password:'',
        passwordCheck:'',
        nickname:'',
        terms: false,
        // validation check 
        // rule || rule 지키지 않았을 때 경고메시지 
        // !!var : 값 없을 때 
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다',  // 이메일check 정규표현식
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.',
        ],
        passwordRules: [
          v => !!v || '비빌번호는 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비빌번호는 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.',
        ]
        }
    },
    methods: {
      onSubmitForm(){
        if(this.$refs.form.validate()){
          //action은 비동기. 따라서 action과 router 실행은 순서대로 되지만,
          //실행이 왼료되는 순서가 다를 수 있음
          // 따라서 실행 순서 맞춰주어야 함.
          //dispatch는 비동기 + promise => then 사용 가능
          // 따라서 순서 맞추기 위하여 then 사용 가능 
          // async - await도 가능!! -> async - await은 무조건 try - catch로 감싸야 함 
          // promise가 있는 자리는 거의 async await 사용 가능 
          this.$store.dispatch('users/signUp', {
            nickname: this.nickname,
            email:this.email
          })
          .then(() => {
            this.$router.push({
              //nuxt도 내부적으로 vue router를 사용하기 때문에
              // 문법이 vue router와 비슷!
              path: '/',
            });
          })
          .catch(() => {
            alert('회원가입 실패');
          });
        }
      }

      // async - await 버전 
      // async onSubmitForm(){
      //   if(this.$refs.form.validate()){
      //     try{
      //      const result = await this.$store.dispatch('users/signUp', {
      //       nickname: this.nickname,
      //       email:this.email
      //     })
      //     } catch (err) {

      //     }
    },
head(){
        return {
            title: '회원가입'
        }
    }
}
</script>

<style>

</style>