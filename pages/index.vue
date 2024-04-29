<template>
  <div>
    index
    <div class="w-32 h-32 bg-red-500">
      {{data}}
    </div>
  </div>
</template>

<script setup lang="ts">

const {data} = await useAsyncData('counter', ()=> $fetch('/api/counter'))
</script>

<style scoped>

</style>