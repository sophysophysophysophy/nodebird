<template>
  <div>
    <v-container>
      <v-card style="margin-bottem: 20px">
        <v-container>
          <v-subheader>프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field label="닉네임" v-model="nickname" :rules="nicknameRules" required />
            <v-btn color="blue" type="submit">
              수정
            </v-btn>
          </v-form> 
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list v-for="follower in followerList" :key="follower" :propsdata="{follower, idx:'1'}" />
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list v-for="follower in followingList" :key="follower" :propsdata="{follower, idx:'2'}" />
        </v-container>          
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from '~/components/FollowList';
export default {
    components: {
        FollowList,
    },
    data() {
        return {
            name: 'Nuxt.js',
            nickname:'',
            nicknameRules: [
              v => !!v || '닉네임을 입력하세요.'
            ],
        }
    },
    computed: {
      followerList() {
        return this.$store.state.users.followerList;
      },
      followingList() {
        return this.$store.state.users.followingList;
      },
    },

    //nuxt가 편의를 위해서 넣어둔 옵션  (layout, head)
    head(){
        return {
            title: '프로필'
        }
    },
    methods: {
      onChangeNickname(){
        this.$store.dispatch('users/changeNickname', {
          nickname:this.nickname
        })
      },
    },
    middleware : 'authenticated'

}
</script>

<style>

</style>