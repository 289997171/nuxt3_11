<template>
  <div>
    <h1>更好的日志记录</h1>
    <div>
      data: {{data}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="execute">测试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
console.log('log test1')

const {data, execute} = useAsyncData('/api/counter', ()=>{
  console.log('log test2')
  return $fetch('/api/counter')
})

onMounted(()=> {
  console.log('log test3')
})
</script>

<style scoped>

</style>