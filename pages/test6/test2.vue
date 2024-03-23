<template>
  <div>
    test2
  </div>
</template>

<script setup lang="ts">
useHeadSafe({
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