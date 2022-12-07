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
  </div>
</template>

<script>
import resto from "@/assets/img/resto.png";
import flag from "@/assets/img/flag.png";


export default {
  name: "ListUsers",
  props: ['listUsersResto'],


  mounted() {

  }
}
</script>

<style scoped>
.list-users {
  width: 25vw;
  height: 93vh;
  padding: 0 0 2rem 2rem;
}

h3 {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  margin-bottom: 24px;
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

.rad-label {
  display: flex;
  align-items: center;

  border-radius: 100px;
  padding: 12px 12px;
  margin: 10px 0;

  cursor: pointer;
  transition: .3s;
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