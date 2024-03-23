<template>
  <div>
    <h1>预渲染时共享的实验性内容</h1>
    <nav class="space-x-4">
      <NuxtLink to="/test4/test1">Test1</NuxtLink>
      <NuxtLink to="/test4/test2">Test2</NuxtLink>
    </nav>
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.sl {
  @apply text-green;
}
</style>