<template>
  <div>
    <nav>
      <!-- 라우터링크 -->
      <nuxt-link to="/">
        Home
      </nuxt-link>
      <nuxt-link to="/profile">
        profile
      </nuxt-link>
      <nuxt-link to="/signup">
        signup
      </nuxt-link>
      <nuxt-link to="/admin">
        admin
      </nuxt-link>
    </nav>

    <!-- 라우터 뷰 -->
    <nuxt />
  </div>
</template>

<script>
export default {
    head(){
        return {
            title: 'admin'
        }
    },
}
</script>

<style>

</style>