<template>
  <div>
    test1
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    { id: 'xss-script', innerHTML: 'alert("xss")' }
  ],
  meta: [
    { 'http-equiv': 'refresh', content: '0;javascript:alert(1)' }
  ]
})

</script>

<style scoped>

</style>