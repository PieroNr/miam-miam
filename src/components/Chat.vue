<template>
  <div class="chat">
    <div class="chat-msg">
      <p :class="message.user ? 'user-message' : 'bot-message' + ' ' +message.status" v-for="message in messages">
        <span class="username" v-if="message.user">{{ message.user._FirstName }} : </span>
        <span>{{ message.message }}</span>
      </p>
    </div>
  <div>




    <input type="text" v-model="message" placeholder="Message">
    <button v-on:click="sendMessage(message)" class="button">
      <span class="button-text">Envoyer</span>
      <img class="icon-chat" src="@/assets/img/send.png" alt="">
    </button>
  </div>
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
      var chat = document.querySelector(".chat-msg");
      chat.scrollTop = chat.scrollHeight;

    });
  }
}
</script>

<style scoped>
input {
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.bot-message{
  background-color: palegreen;
}

.chat-msg {
  overflow-y: scroll;
  padding-right: 24px;
  margin-bottom: 18px;
  height: 220px;
}



.button {
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background: none;
}

.icon-chat {
  width: 16px;
  height: 16px;
  margin-left: 6px;
}

.button-text {
  font-size: 13px;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.username {
  font-weight: 700 !important;
}

.bot-message {
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
}
.join {
  background-color: #baffba;
}

.leave {
  background-color: #ffb8b2;
}

.change {
  background-color: #ffab65;
}

</style>