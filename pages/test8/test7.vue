<template>
  <div>
    <div>
      data: {{data}}
    </div>
  </div>
</template>

<script setup lang="ts">
// 服务器端和客户端都会执行一次
const data = await $myFetch('/api/counter')
</script>

<style scoped>

</style>