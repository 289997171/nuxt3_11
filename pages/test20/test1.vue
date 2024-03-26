<template>
  <div>
    test1: {{casinoHistoriesState}}
  </div>
</template>

<script setup lang="ts">
const {casinoHistoriesState, addCasinoHistory} = useCasinoHistories();
</script>

<style scoped>

</style>