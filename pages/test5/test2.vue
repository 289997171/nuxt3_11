<template>
  <div>
    test2
  </div>
</template>

<script setup lang="ts">
// 仅仅服务器端请求的时候才添加head
useServerHead({
  title: 'HEAD Server',
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