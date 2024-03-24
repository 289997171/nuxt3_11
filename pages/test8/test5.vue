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
import type {FetchContext, FetchResponse} from "ofetch";

const {data, error, execute} = await useAsyncData('/api/test8/error2', ()=> $myFetch('/api/test8/error2', {
  // onResponseError(context: FetchContext & { response: FetchResponse<any> }): Promise<void> | void {
  //   if (process.client) alert('xxxx')
  // }
}))
</script>

<style scoped>

</style>