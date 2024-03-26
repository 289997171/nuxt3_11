<template>
  <div>
    后台管理页面
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: (to, from) => {
  //   // 访问admin,必须 /admin?key=xxx 才允许
  //   if (to.query.key !== 'xxx') {
  //     return navigateTo('/', {replace: true})
  //     // showError({
  //     //   status: 404,
  //     //   message: '找不到页面'
  //     // })
  //   }
  // }
  middleware: ['auth']
})
</script>

<style scoped>

</style>