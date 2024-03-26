<template>
  <Html>
    <Body>
      <NuxtLoadingIndicator/>

      <div class="flex flex-row h-100vh">
        <!--Left-->
        <aside class="w-64 h-full bg-red" ></aside>

        <!--Right-->
        <aside class="flex-1 h-full flex flex-col bg-yellow">
          <header class="h-20 bg-black"></header>
          <div class="flex-1 h-0 overflow-y-scroll flex flex-col justify-between bg-gray-300">
            <NuxtPage class="flex-1 bg-pink container mx-auto"/>
            <footer class="h-40 bg-green">123</footer>
          </div>
        </aside>
      </div>
    </Body>
  </Html>
</template>
<script setup lang="ts">
</script>