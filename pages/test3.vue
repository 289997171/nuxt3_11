<template>
  <div>
    <h1>新的数据获取实用程序clear</h1>
    <div>将任何当前挂起的请求标记为已取消</div>
    <div>
      counter: {{counter}}
    </div>
    <div>
      data: {{data}}
    </div>
    <div>
      status: {{status}}
    </div>
    <div>
      <button class="px-4 py-2 shadow" @click="execute">测试请求</button>
      <button class="px-4 py-2 shadow" @click="clear">测试中断请求</button>
      <button class="px-4 py-2 shadow" @click="reExecute">测试自动中断以前请求</button>
    </div>
    <div>
      连续请求多次,最终渲染只会渲染最后一次请求的结果!
    </div>
    <div>
      调用clear后,data将清空,并且不会真正中断http请求,http请求任然会完成,但不会修改data,那么有什么意义呢?
    </div>
    <div>
      意义:当某些已经请求并获得的数据,再某种条件达成后需要清理掉,那么可以使用clear
    </div>
  </div>
</template>

<script setup lang="ts">
const counter = ref(0)
const {data, execute, status, clear} = useAsyncData('/api/clear', ()=>{
  counter.value++
  return $fetch('/api/clear', {
  query: {
    waitFor: 10000,
    res: counter.value
  }
})},{immediate: false})

const reExecute = ()=> {
  clear()
  execute()
}
</script>

<style scoped>

</style>