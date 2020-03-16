<template>
  <!-- 패딩 주기 위한 container -->
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field label="이메일" :rules="emailRules" type="email" required />
          <v-text-field label="비밀번호" :rules="passwordRules" type="password" required />
        </v-container>
        <v-btn color="green" type="submit" :disabled="!valid">
          로그인
        </v-btn>
        <v-btn nuxt to="/signup">
          회원가입
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        {{ me.nickname }}님 로그인 되었습니다.
        <v-btn @click="onLogOut" >
          로그아웃
        </v-btn>
      </v-container>
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
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    methods: {
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('users/logIn', {
                  emall:this.email,
                  nickname:'정현주',
                })
            }
        },
        onLogOut(){
          this.$store.dispatch('users/logOut')
        }

    },
}
</script>

<style>

</style>