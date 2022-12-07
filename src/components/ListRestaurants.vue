<script setup lang="ts">
</script>

<template>
    <div class="list">
      <h3>Liste des restaurants</h3>
      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">La Table de Colette</div>
      </label>
      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">Sens Uniques</div>
      </label>
      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">6 New york</div>
      </label>
      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">Mensae</div>
      </label>
      <label class="rad-label">
        <input type="radio" class="rad-input" name="rad">
        <div class="rad-design"></div>
        <div class="rad-text">Polpo</div>
      </label>
    </div>
</template>

<style scoped>
.list {
  width: 20vw;
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

  transition: .3s;
}

.rad-input:checked~.rad-text {
  color: hsl(0, 0%, 8%);
}
</style>