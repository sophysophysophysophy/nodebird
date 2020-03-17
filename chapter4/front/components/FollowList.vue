<template>
  <div>
        <span>{{ propsdata.follower.nickname }}</span>
        <v-icon @click="removeFollower">mdi-minus-circle-outline</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    propsdata: {
      type: Object,
      required: true,
    },

  },
  methods: {
    removeFollower(){
      if(this.propsdata.idx === '1')  this.$store.dispatch('users/removeFollowing', this.propsdata.follower.email)
      
      if(this.propsdata.idx === '2') this.$store.dispatch('users/removeFollower', this.propsdata.follower.email)      
    }
  }
}
</script>

<style>

</style>