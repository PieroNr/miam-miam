<template>
  <div class="login">
    <div class="login-form">
        <h3>Création de compte</h3>
        <ul class="list-avatar" id="list">
          <li v-for="avatar in avatars">
            <img v-on:click="activeAvatar" class="icon-avatar" :src="avatar.name" alt="">
          </li>
        </ul>
        <input type="text" placeholder="Prénom et Nom">
        <input type="text" placeholder="Latitude">
        <input type="text" placeholder="Longitude">
        <input type="text" placeholder="Nom de la room à rejoindre">
        <button class="button">
          <span class="button-text">Connexion</span>
          <img class="icon-plus" src="@/assets/img/lock.png" alt="">
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      avatars: []
    }
  },
  methods: {
    activeAvatar(e){
      var list = document.querySelectorAll('.icon-avatar');
      list.forEach(elem => {
        elem.classList.remove('icon-avatar-active');
      })
      e.target.classList.add('icon-avatar-active');
    }
  },
  mounted() {
    this.avatars = import.meta.glob('@/assets/img/avatars/*.png')
    console.log(this.avatars)
  }
}



</script>


<style scoped>
.login {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 50%;
}

.list-avatar {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-inline-start: 0;
  margin: 16px 0;
}

.icon-avatar {
  width: 60px;
  height: 60px;
  margin: 4px;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid transparent;
  background-color: transparent;
  transition: .3s ease-in-out all;
}

.icon-avatar-active {
  border: 3px solid rebeccapurple;
  background-color: rebeccapurple;
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

.button {
  display: flex;
  align-items: center;
  border: none;
  /* padding: 12px; */
  margin: 16px 0;
  cursor: pointer;
  background: none;
}

.icon-plus {
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
</style>
