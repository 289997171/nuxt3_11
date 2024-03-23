<template>
  <div>
    <div>Tes2</div>
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
    res: "测试2"
  }
})})
</script>

<style scoped>

</style>