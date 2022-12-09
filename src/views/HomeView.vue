<script>


import Map from '@/components/Map.vue'

import ListUsers from "@/components/ListUsers.vue";
import ListRestaurants from '@/components/ListRestaurants.vue';
import SocketioService from '@/services/socketio.service.js';
import {mapWritableState} from "pinia/dist/pinia";
import {useMiamStore} from "@/components/store";

export default {

  mounted() {

    //SocketioService.setupSocketConnection();

    // localStorage.setItem('currentUser', JSON.stringify(new User("Benoit", "CHEVALLIER", [48.86, 2.33], L.icon({
    //   iconUrl: benoit,
    //   iconSize: [35, 35],
    //   startTime: 10}))))

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
  computed: {
    ...mapWritableState(useMiamStore, ['user', 'room'])
  },
  methods: {

    getListPerso(list) {

      this.listUsersResto = list;

    },
    getListResto(list) {
      this.listResto = list;

    },
    pushCreatedResto(resto) {

      SocketioService.socket.emit('addResto', this.room,resto);
      this.$refs.map.loadRestaurant()


    },
    pushUpdateUserResto(listUserResto){
      this.listUsersResto = listUserResto

      SocketioService.socket.emit('changeResto', this.room,this.listUsersResto);
      this.$refs.map.updatePersoResto(this.listUsersResto)
    }
  }
}


</script>

<template>
  <div class="container">
    <ListRestaurants :listUsersResto="listUsersResto" :listResto="listResto" @created-resto="pushCreatedResto" @update-user-resto="pushUpdateUserResto"></ListRestaurants>
    <Map @getListPersoResto="getListPerso" @getListResto="getListResto" ref="map"></Map>
    <ListUsers :listUsersResto="listUsersResto"/>
    <!-- <LoginView></LoginView> -->
  </div>



</template>

<style scoped>
.container {
  display: flex;
}
</style>