<template>
  <div>

    <p v-for="message in messages">{{ user._FirstName }} : {{ message.message }}</p>
    <input type="text" v-model="message" placeholder="Message">
    <button v-on:click="sendMessage(message)">Envoyer</button>
  </div>
</template>

<script>

import io from 'socket.io-client';
import SocketioService from '../services/socketio.service.js';

export default {
  name: "Chat",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('currentUser')) ,
      message: '',
      messages: [],

    }
  },
  methods: {
    sendMessage(e) {
      console.log(this.user)

      SocketioService.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      });
      this.message = ''
    }
  },
  mounted() {
    SocketioService.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];

    });
  }
}
</script>

<style scoped>

</style>