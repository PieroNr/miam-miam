<script>


import Map from '@/components/Map.vue'
import LoginView from "@/views/LoginView.vue";
import ListUsers from "@/components/ListUsers.vue";
import ListRestaurants from '@/components/ListRestaurants.vue';
import SocketioService from './services/socketio.service.js';
import User from "@/assets/script/User";
import L from "leaflet";
import benoit from "@/assets/img/avatar1.png";
import {mapWritableState} from "pinia/dist/pinia";
import {useMiamStore} from "@/components/store";

  export default {
    created() {
      // SocketioService.setupSocketConnection();

      // localStorage.setItem('currentUser', JSON.stringify(new User("Benoit", "CHEVALLIER", [48.86, 2.33], L.icon({
      //   iconUrl: benoit,
      //   iconSize: [35, 35],
      //   startTime: 10}))))

    },
    beforeUnmount() {
      SocketioService.disconnect(this.user, this.room);
    },
    computed: {
      ...mapWritableState(useMiamStore, ['user', 'room'])
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
        SocketioService.socket.emit('addResto', this.room,resto);
        this.$refs.map.loadRestaurant()


      },
      pushUpdateUserResto(listUserResto){
        this.listUsersResto = listUserResto

        SocketioService.socket.emit('changeResto', this.room, this.listUsersResto);
        this.$refs.map.updatePersoResto(this.listUsersResto)
      }
    }
  }


</script>

<template>

  <router-view></router-view>




</template>

<style scoped>
.container {
  display: flex;
}
</style>
