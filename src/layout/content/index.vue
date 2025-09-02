<template>
  <router-view v-slot="{ Component, route }">
    <div :key="route.path" class="main">
      <component :is="Component" />
    </div>
  </router-view>
</template>

<script></script>

<style scoped>
.main {
  flex: 1;
  padding: 20px;
}
</style>
