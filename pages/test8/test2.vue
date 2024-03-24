<template>
  <div>
    <div>
      data: {{data}}
    </div>
    <div>
      error: {{error}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="execute">测试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const {data, error, execute} = await useAsyncData('/api/test8/reqxxx', ()=> $myFetch('/api/test8/reqxxx', {
  method: 'POST',
  headers: {
    'token': 'token'
  },
  query: {
    page: 1
  },
  body: {
    username: 'zhangshan',
    password: 'lisi',
  },
}))
</script>

<style scoped>

</style>