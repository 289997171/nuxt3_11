<template>
  <div>
    <h1>预览模式</h1>
    <div>
      <pre>
        http://localhost:3000/test2?preview=true
      </pre>
      enabled: {{enabled}} - state: {{state}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="enabled = !enabled">切换到{{enabled ? '预览' : '正式'}}</button>
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
const { enabled, state } = usePreviewMode()
const {data, execute} = useAsyncData('/api/cache', ()=>$fetch('/api/cache'), {
  getCachedData: (key, nuxtApp) => {
    const cacheData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (cacheData /*|&& cacheData.expireTime < Date.now()*/) return cacheData
  }
})
</script>

<style scoped>

</style>