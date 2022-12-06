<template>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import food from "@/assets/img/food.png"


export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
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

    // La Table de Colette
    L.marker([48.84, 2.34], {icon: foodIcon}).addTo(this.map);
    // 6 New York
    L.marker([48.86, 2.29], {icon: foodIcon}).addTo(this.map);
    // Sens Uniques
    L.marker([48.88, 2.33], {icon: foodIcon}).addTo(this.map);
    // Mensae
    L.marker([48.87, 2.38], {icon: foodIcon}).addTo(this.map);
    // Polpo
    L.marker([48.90, 2.28], {icon: foodIcon}).addTo(this.map);
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