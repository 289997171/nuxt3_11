<template>
  <div>
    <div>
      data: {{data}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="execute">测试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const {data, execute} = await useAsyncData('/api/test8/req', ()=> $myFetch('/api/test8/req', {
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
}), {
  deep: false
})
</script>

<style scoped>

</style>