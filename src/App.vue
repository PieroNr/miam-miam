<script>

import Map from './components/Map.vue'
import ListUsers from "@/components/ListUsers.vue";

  export default {
    components: {Map, ListUsers},
    data() {
      return {
        listUsersResto: []
      }
    },
    methods: {
      getListPerso(list) {
        this.listUsersResto = list;
      }
    }
  }
import ListRestaurants from './components/ListRestaurants.vue'

</script>

<template>
  <Map @getListPersoResto="getListPerso($event)"></Map>
  <ListUsers :listUsersResto="listUsersResto"/>
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
