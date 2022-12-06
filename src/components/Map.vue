<template>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import benoit from "@/assets/img/avatar1.png";
import akim from "@/assets/img/avatar2.png";
import sophie from "@/assets/img/avatar3.png";


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
    var avatar1 = L.icon({
      iconUrl: benoit,
      iconSize:     [35, 35],
    });

    var avatar2 = L.icon({
      iconUrl: akim,
      iconSize:     [35, 35],
    });

    var avatar3 = L.icon({
      iconUrl: sophie,
      iconSize:     [35, 35],
    });
    L.marker([48.86, 2.33], {icon: avatar1}).addTo(this.map);
    L.marker([48.84, 2.35], {icon: avatar2}).addTo(this.map);
    L.marker([48.85, 2.37], {icon: avatar3}).addTo(this.map);

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