<script>


import Map from './components/Map.vue'
import LoginView from "@/views/LoginView.vue";
import ListUsers from "@/components/ListUsers.vue";
import ListRestaurants from '@/components/ListRestaurants.vue';
import SocketioService from './services/socketio.service.js';
import User from "@/assets/script/User";
import L from "leaflet";
import benoit from "@/assets/img/avatar1.png";

  export default {
    created() {
      SocketioService.setupSocketConnection();

      localStorage.setItem('currentUser', JSON.stringify(new User("Benoit", "CHEVALLIER", [48.86, 2.33], L.icon({
        iconUrl: benoit,
        iconSize: [35, 35],
        startTime: 10}))))

    },
    beforeUnmount() {
      SocketioService.disconnect();
    },

    components: {ListRestaurants, Map, ListUsers},
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
        SocketioService.socket.emit('addResto', resto);
        this.$refs.map.loadRestaurant()


      },
      pushUpdateUserResto(listUserResto){
        this.listUsersResto = listUserResto

        SocketioService.socket.emit('changeResto', this.listUsersResto);
        this.$refs.map.updatePersoResto(this.listUsersResto)
      }
    }
  }


</script>

<template>
  <div class="container">
    <ListRestaurants :listUsersResto="listUsersResto" :listResto="listResto" @created-resto="pushCreatedResto" @update-user-resto="pushUpdateUserResto"></ListRestaurants>
    <Map @getListPersoResto="getListPerso($event)" @getListResto="getListResto($event)" ref="map"></Map>
    <ListUsers :listUsersResto="listUsersResto"/>
    <!-- <LoginView></LoginView> -->
  </div>



</template>

<style scoped>
.container {
  display: flex;
}
</style>
