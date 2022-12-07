

<template>
  <div v-if="listResto && listUsersResto" class="list">
    <div>
      <h3>Liste des restaurants</h3>
      <label v-for="resto in listResto" class="rad-label">
        <input type="radio" v-on:change="changeSelectedResto" v-model="selectedResto" class="rad-input" name="rad" :value="resto">
        <div class="rad-design"></div>
        <div class="rad-text">{{ resto._name }}</div>
      </label>
      
      <button v-on:click="showModal" class="button">
        <img class="icon-plus" src="@/assets/img/plus.png" alt="">
        <span class="button-text">Ajouter un restaurant</span>
      </button>
      <div class="modal">
        <div class="modal-content">
          <div style="width: 100%; display: flex; justify-content: flex-end;">
            <span v-on:click="closeModal" class="close-btn">&times;</span>
          </div>
          <input type="text" v-model="newResto.name" placeholder="Nom du restaurant" />
          <input type="number" v-model="newResto.coord[0]" placeholder="Latitude" />
          <input type="number" v-model="newResto.coord[1]" placeholder="Longitude" />
          <button v-on:click="addResto" class="button">
            <img class="icon-plus" src="@/assets/img/plus.png" alt="">
            <span class="button-text">Ajouter le restaurant</span>
          </button>
        </div>
      </div>
    </div>
    <div class="active-user">
      <img class="icon-avatar" src="@/assets/img/avatars/avatar9.png" alt="">
      <div>
        <p class="active-user__name">Benoît CHEVALLIER</p>
        <p>{{ selectedResto.name != "" ? selectedResto.name : "Aucun restaurant"}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Restaurant from "@/assets/script/Restaurant";

export default {
  name: "ListRestaurants",
  props: {listResto: [], listUsersResto: []},
  data() {
    return {
      newResto: new Restaurant("", []),
      selectedResto: new Restaurant("", [])

    }

  },
  methods: {
    changeSelectedResto(){
      this.listUsersResto.forEach((userResto, index) => {
        if(userResto["User"]._FirstName == "Benoit"){
          this.listUsersResto[index]["Resto"] = this.selectedResto
          this.$emit('updateUserResto', this.listUsersResto)
          return
        }

      })
    },
    showModal(){
      let modal = document.querySelector(".modal")
      modal.style.display = "block"
    },

    closeModal(){
      let modal = document.querySelector(".modal")
      modal.style.display = "none"
    },
    addResto()  {
      this.closeModal()
      this.$emit('createdResto', this.newResto)

    },
  },
  mounted() {

  }
}
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  padding-top: 12%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 64px;
  margin: auto;
  width: 50%;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

.close-btn {
  font-size: 26px;
  font-weight: 400;
  margin-left: auto;
  cursor: pointer;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20vw;
  height: 100vh;
  padding: 2rem;
}

.active-user {
  display: flex;
  align-items: center;
  background: hsla(0, 0%, 80%, .14);
  margin: 10px 0;
  border-radius: 24px;
  padding: 18px;
  font-size: 16px;
  color: hsl(0, 0%, 8%);
}

.active-user__name {
  font-weight: 700;
  font-size: 16px;
  color: hsl(0, 0%, 8%);
}

.icon-avatar {
  width: 48px;
  height: 48px;
  margin-right: 16px;
}

input {
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 12px;
  margin-bottom: 24px;
  font-size: 16px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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

.rad-label {
  display: flex;
  align-items: center;

  border-radius: 100px;
  padding: 12px 12px;
  margin: 10px 0;

  cursor: pointer;
  transition: .3s;
}

.rad-label:hover,
.rad-label:focus-within {
  background: hsla(0, 0%, 80%, .14);
}

.rad-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
}

.rad-design {
  width: 18px;
  height: 18px;
  border-radius: 100px;

  background: linear-gradient(to right bottom, hsl(189, 97%, 62%), hsl(278, 85%, 54%));
  position: relative;
}

.rad-design::before {
  content: '';

  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;

  background: hsl(0, 0%, 90%);
  transform: scale(1.1);
  transition: .3s;
}

.rad-input:checked+.rad-design::before {
  transform: scale(0);
}

.rad-text {
  color: hsl(0, 0%, 67%);
  margin-left: 14px;
  /* letter-spacing: 3px; */
  /* text-transform: uppercase; */
  font-size: 16px;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  transition: .3s;
}

.rad-input:checked~.rad-text {
  color: hsl(0, 0%, 8%);
}

.active-user {
  display: flex;
  align-items: center;
  background: hsla(0, 0%, 80%, .14);
  margin: 10px 0;
  border-radius: 24px;
  padding: 18px;
  font-size: 16px;
  color: hsl(0, 0%, 8%);
}

.active-user__name {
  font-weight: 700;
  font-size: 16px;
  color: hsl(0, 0%, 8%);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.icon-avatar {
  width: 48px;
  height: 48px;
  margin-right: 16px;
}

.button {
  display: flex;
  align-items: center;
  border: none;
  padding: 12px;
  margin: 16px 0;
  cursor: pointer;
  background: none;
}

.icon-plus {
  width: 12px;
  height: 12px;
  margin-right: 6px;
}

.button-text {
  font-size: 13px;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
</style>