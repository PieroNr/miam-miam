<script>

import Map from './components/Map.vue'
import ListUsers from "@/components/ListUsers.vue";
import ListRestaurants from '@/components/ListRestaurants.vue'


  export default {
    components: {ListRestaurants, Map, ListUsers},
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


</script>

<template>
  <div class="container">
    <ListRestaurants></ListRestaurants>
    <Map @getListPersoResto="getListPerso($event)"></Map>
    <ListUsers :listUsersResto="listUsersResto"/>
  </div>



</template>

<style scoped>
.container {
  display: flex;
}
</style>
