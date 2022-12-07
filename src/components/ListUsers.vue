<template>
  <div v-if="listUsersResto">
    <div style="margin: 20px" v-for="userDetails in listUsersResto">
      <p>{{userDetails["User"]["_FirstName"]}} {{userDetails["User"]["_LastName"]}}</p>
      <b style="font-weight: bolder">{{userDetails["Resto"]["_name"]}}</b>
      <p>Arrive dans {{ Math.trunc(userDetails["Time"])}} minutes</p>

    </div>
  </div>
</template>

<script>
export default {
  name: "ListUsers",
  props: ['listUsersResto'],


  mounted() {

  }
}
</script>

<style scoped>

</style>