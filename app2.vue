<template>
  <Html>
  <Body>
  <NuxtLoadingIndicator/>

  <div class="flex flex-row">
    <!--Left-->
    <aside class="w-64 h-100vh sticky top-0 overflow-y-scroll" >
      <ul>
        <li v-for="idx in 100">{{idx}}</li>
      </ul>
    </aside>

    <!--Right-->
    <aside class="flex-1 bg-yellow">
      <header class="h-20 bg-black sticky top-0"></header>
      <NuxtPage class="min-h-[calc(100vh-240px)] bg-pink container mx-auto"/>
      <footer class="h-40 bg-green">123</footer>
    </aside>
  </div>
  </Body>
  </Html>
</template>
<script setup lang="ts">
</script>