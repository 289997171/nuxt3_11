<template>
  <div>
    <div>Tes1</div>
    <div>
      data: {{data}}
    </div>
  </div>
</template>

<script setup lang="ts">
const {data} = useAsyncData('/api/clear', ()=>{
  return $fetch('/api/clear', {
  query: {
    waitFor: 10000,
    res: "测试1"
  }
})})
</script>

<style scoped>

</style>