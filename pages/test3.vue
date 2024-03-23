<template>
  <div>
    <h1>新的数据获取实用程序clear</h1>
    <div>将任何当前挂起的请求标记为已取消</div>
    <div>
      data: {{data}}
    </div>
    <div>
      status: {{status}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="execute">测试请求</button>
      <button class="px-4 py-2 shadow" @click="clear">测试中断请求</button>
    </div>
    <div>
      调用clear后,data将清空,并且不会真正中断http请求,http请求任然会完成,但不会修改data
    </div>
  </div>
</template>

<script setup lang="ts">
const {data, execute, status, clear} = useAsyncData('/api/counter2', ()=>$fetch('/api/counter2?waitFor=10000'),{immediate: false})
</script>

<style scoped>

</style>