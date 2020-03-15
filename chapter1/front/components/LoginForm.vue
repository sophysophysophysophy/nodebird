<template>
  <!-- 패딩 주기 위한 container -->
  <v-container>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field label="이메일" :rules="emailRules" type="email" required />
          <v-text-field label="비밀번호" :rules="passwordRules" type="password" required />
        </v-container>
      </v-form>
      <v-btn color="green" type="submit" :disabled="!valid">
        로그인
      </v-btn>
      <v-btn nuxt to="/signup">
        회원가입
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid:false,
            emall: '',
            password:'',
            emailRules: [
            v => !!v || '이메일은 필수입니다.',
            v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다',  // 이메일check 정규표현식
            ],
            passwordRules: [
            v => !!v || '비빌번호는 필수입니다.',
            ],


        }
    },
    methods: {
        onSubmitForm(){
            console.log("dfd");
            
            if(this.$refs.form.valiate()){
                alert('로그인 시도');
                console.log("시도!!");
            }
        }

    },
}
</script>

<style>

</style>