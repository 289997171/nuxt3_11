<template>
  <div>
    test1
  </div>
</template>

<script setup lang="ts">
// 客户端和服务器端都会添加head内容
useHead({
  title: 'HEAD Client',
  meta: [
    {
      name: 'description',
      content: 'My page description',
    }
  ]
})

</script>

<style scoped>

</style>