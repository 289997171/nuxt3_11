<template>
  <div>
    <div>
      测试 prerender: false
    </div>
    <div>
      data: {{data}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="execute">测试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
console.log('prerender: false')
const {data, execute} = useAsyncData('/api/counter', ()=>$fetch('/api/counter'))
</script>

<style scoped>

</style>