<script>

import Map from './components/Map.vue'
import LoginView from "@/views/LoginView.vue";
import ListUsers from "@/components/ListUsers.vue";
import ListRestaurants from '@/components/ListRestaurants.vue'


  export default {
    components: {ListRestaurants, Map, ListUsers, LoginView},
    data() {
      return {
        listUsersResto: [],
        listResto: [],

      }
    },
    methods: {
      getListPerso(list) {
        this.listUsersResto = list;

      },
      getListResto(list) {
        this.listResto = list;

      },
      pushCreatedResto(resto) {
        this.listResto.push(resto)
        this.$refs.map.loadRestaurant()


      },
      pushUpdateUserResto(listUserResto){
        this.listUsersResto = listUserResto
        this.$refs.map.updatePersoResto(this.listUsersResto)
      }
    }
  }


</script>

<template>
  <div class="container">
    <!-- <ListRestaurants :listUsersResto="listUsersResto" :listResto="listResto" @created-resto="pushCreatedResto" @update-user-resto="pushUpdateUserResto"></ListRestaurants>
    <Map @getListPersoResto="getListPerso($event)" @getListResto="getListResto($event)" ref="map"></Map>
    <ListUsers :listUsersResto="listUsersResto"/> -->
    <LoginView></LoginView>
  </div>



</template>

<style scoped>
.container {
  display: flex;
}
</style>
