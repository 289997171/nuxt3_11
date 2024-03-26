<template>
  <div>
    test1
    <ul>
      <li class="h-10" v-for="idx in 100">{{idx}}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  scrollToTop: true
})
</script>

<style scoped>

</style>