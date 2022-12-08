<template>
  <div>


    <p :class="message.user ? 'user-message' : 'bot-message' + ' ' +message.status" v-for="message in messages">
      <span v-if="message.user">{{ message.user._FirstName }} : </span>
      <span>{{ message.message }}</span>
    </p>

    <input type="text" v-model="message" placeholder="Message">
    <button v-on:click="sendMessage(message)">Envoyer</button>
  </div>
</template>

<script>


import SocketioService from '../services/socketio.service.js';
import {mapWritableState} from "pinia/dist/pinia";
import {useMiamStore} from "@/components/store";

export default {
  name: "Chat",
  data() {
    return {
      message: '',
      messages: [],

    }
  },
  computed: {
    ...mapWritableState(useMiamStore, ['user', 'room'])
  },
  methods: {
    sendMessage(e) {


      SocketioService.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
        room: this.room
      });
      this.message = ''
    }
  },
  mounted() {
    SocketioService.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
      console.log(data)

    });
  }
}
</script>

<style scoped>
.bot-message{
  background-color: palegreen;
}

.join {
  background-color: palegreen;
}

.leave {
  background-color: red;
}

</style>