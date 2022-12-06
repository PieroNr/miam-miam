<template>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import User from "@/assets/script/User";
import Restaurant from "@/assets/script/Restaurant";
import benoit from "@/assets/img/avatar1.png";
import akim from "@/assets/img/avatar2.png";
import sophie from "@/assets/img/avatar3.png";
import food from "@/assets/img/food.png"


export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      users: [new User("Benoit", "CHEVALLIER", [48.86, 2.33], L.icon({
                iconUrl: benoit,
                iconSize:     [35, 35]})
              ),
              new User("Akim", "DEBARBES", [48.84, 2.35], L.icon({
                iconUrl: akim,
                iconSize:     [35, 35]})
              ),
              new User("Sophie", "FONFEQUE", [48.85, 2.37], L.icon({
                iconUrl: sophie,
                iconSize:     [35, 35]})
              ),
            ],
      restaurants: [new Restaurant("La Table de Colette", [48.84, 2.34]),
                    new Restaurant("6 New York", [48.86, 2.29]),
                    new Restaurant("Sens Uniques", [48.88, 2.33]),
                    new Restaurant("Mensae", [48.87, 2.38]),
                    new Restaurant("Polpo", [48.90, 2.28])],
      
    };
  },
  mounted() {
    this.map = L.map("mapContainer").setView([48.86, 2.33], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //use a mix of renderers
    var customPane = this.map.createPane("customPane");
    var canvasRenderer = L.canvas({ pane: "customPane" });
    customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400

    var foodIcon = L.icon({
      iconUrl: food,
      iconSize: [35, 35],
    });
    var userRestaurant = [];



    this.users.forEach(user => {
      L.marker(user.coord, {icon: user.icon}).addTo(this.map);
      userRestaurant.push([user, this.restaurants[Math.floor(Math.random() * this.restaurants.length)]])
    })

    this.restaurants.forEach(resto => {
      L.marker(resto.coord, {icon: foodIcon}).addTo(this.map);
    })

    this.map = drawLines(userRestaurant, this.map)


    function drawLines(userResto, currentMap){
      userResto.forEach(asso => {
        L.polyline([asso[0].coord, asso[1].coord], {
          color: 'red'
        }).addTo(currentMap);
      })
      return currentMap
    }





    //L.marker([48.86, 2.33], {icon: avatar1}).addTo(this.map);


    // La Table de Colette
    //L.marker([48.84, 2.34], {icon: foodIcon}).addTo(this.map);
    // 6 New York
    //L.marker([48.86, 2.29], {icon: foodIcon}).addTo(this.map);
    // Sens Uniques
    //L.marker([48.88, 2.33], {icon: foodIcon}).addTo(this.map);
    // Mensae
    //L.marker([48.87, 2.38], {icon: foodIcon}).addTo(this.map);
    // Polpo
    //L.marker([48.90, 2.28], {icon: foodIcon}).addTo(this.map);
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>