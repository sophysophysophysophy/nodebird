<template>
  <!-- vuetify는 상위에 v-app 필요  -->
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">
            NodeBird
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{ display:'flex', align : 'center'}" />
          <v-btn text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row>
      <!-- xs:휴대폰 (반응형) -->
      <v-col cols="12" md="4">
        <LoginForm />
      </v-col>

      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginForm from '~/components/LoginForm';

export default {
  components: {
    LoginForm,
  }
  // head가 없는 페이지는 layout의 head 사용 (공통)
  // 하지만 config.js에서 운용하는게 중복 제거에 효과적
  // head(){
  //       return {
  //           title: 'NodeBird'
  //       }
  //   },
}
</script>

<style>

</style>