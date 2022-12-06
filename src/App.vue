<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Map from './components/Map.vue'
import ListRestaurants from './components/ListRestaurants.vue'

</script>

<template>
  <div class="container">
    <ListRestaurants></ListRestaurants>
    <Map></Map>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
