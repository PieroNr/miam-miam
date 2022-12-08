<template>
  <div v-if="listUsersResto" class="list-users">
    <h3>Suivi des trajets</h3>
    <div class="list-users__item" v-for="userDetails in listUsersResto">
      <p class="list-users-name">{{userDetails["User"]["_FirstName"]}} {{userDetails["User"]["_LastName"]}}</p>
      <div class="flex">
        <img class="icon" src="@/assets/img/resto.png" alt="">
        <p>{{userDetails["Resto"]["_name"]}}</p>
      </div>
      <div class="flex">
        <img class="icon" src="@/assets/img/flag.png" alt="">
        <p>Arrive dans {{ Math.trunc(userDetails["Time"])}} minutes</p>
      </div>
    </div>
    <div class="chat-container">

    </div>
  </div>
</template>

<script>
import Chat from "@/components/Chat.vue";


export default {
  components: {Chat},
  name: "ListUsers",
  props: ['listUsersResto'],


  mounted() {

  }
}
</script>

<style scoped>
.list-users {
  width: 22vw;
  height: 100vh;
  padding: 2rem;
  background-color: white;
  z-index: 2;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

h3 {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  margin-bottom: 24px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.flex {
  display: flex;
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.list-users-name {
  font-weight: 600;
  margin-bottom: 6px;
}

.list-users__item {
  background: hsla(0, 0%, 80%, .14);
  margin: 10px 0;
  border-radius: 24px;
  padding: 18px;
  font-size: 16px;
  color: hsl(0, 0%, 8%);
}

</style>