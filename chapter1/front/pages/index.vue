<template>
  <div>
    <post-card />
    <post-card />
    <post-card />
    <post-card />
  </div>
</template>

<script>
//dx : developer experience. 개발자들이 개발하기 편한 환경 
// 수백만개 파일을 하나로 줄일 수 있는 방법 알려줌.
// vue 라우터를 사용할 떄는 실제로 페이지 하나인데 컴포넌트 수백만개를 서로 바꿔가면서 눈속임
// -> 따라서 모든 컴포넌트가 로딩된 후 페이지 볼 수 있음 : 성능에 문제 (몇몇 컴포넌트만 볼 때)
// nuxt : 눈속임 아님. 실제로 개별적인 페이지들. (code splitting )
// 별개의 페이지로 구성된 nuxt는 로딩할 페이지들만 로딩하기 때문에 효율적
// 페이지 넘어갈 때 깜빡임 (vue는 이를 없애기 위해 한번에 로딩)
// code splitting : 다음에 갈 확률이 높은 페이지들 미리 불러옴 -> 페이지 깜빡임없이 넘어감 (앱처럼) : ux
// nuxt : code splitting + ux 까지 신경 쓴 프레임워크
import PostCard from '~/components/PostCard'

export default {
    components: {
        PostCard,
    }

}
</script>

<style>

</style>