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
</script>

<template>
  <Map @getListPersoResto="getListPerso($event)"></Map>
  <ListUsers :listUsersResto="listUsersResto"/>
</template>

<style>

</style>
