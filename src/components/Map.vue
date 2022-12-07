<template>
    <div style="display: flex; flex-direction: column">
    <p v-for="dt in listDistanceTime">Miam à {{ convertTime(endTime) }} : {{ dt["User"]._FirstName }} doit partir à
      {{ convertTime((endTime * 60 - dt["Time"]) / 60) }}</p>
    <div id="mapContainer"></div>
    </div>

</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import User from "@/assets/script/User";
import Restaurant from "@/assets/script/Restaurant";
import benoit from "@/assets/img/avatar1.png";
import akim from "@/assets/img/avatar2.png";
import sophie from "@/assets/img/avatar3.png";
import food from "@/assets/img/food.png";
import endPoint from "@/assets/img/end-point.png"


export default {
  name: "LeafletMap",

  created() {
    console.log(this.listDistanceTime)
  },
  data() {
    return {
      map: null,
      listDistanceTime: [],
      users: [new User("Benoit", "CHEVALLIER", [48.86, 2.33], L.icon({
            iconUrl: benoit,
            iconSize: [35, 35],
            startTime: 10
          })
      ),
        new User("Akim", "DEBARBES", [48.84, 2.35], L.icon({
              iconUrl: akim,
              iconSize: [35, 35],
              startTime: 0
            })
        ),
        new User("Sophie", "FONFEQUE", [48.85, 2.37], L.icon({
              iconUrl: sophie,
              iconSize: [35, 35],
              startTime: 0
            })
        ),
      ],
      restaurants: [new Restaurant("La Table de Colette", [48.84729, 2.34720]),
        new Restaurant("6 New York", [48.86423, 2.29964]),
        new Restaurant("Sens Uniques", [48.88975, 2.33394]),
        new Restaurant("Mensae", [48.87572, 2.38572]),
        new Restaurant("Polpo", [48.90018, 2.28078])],
      polylines: [],
      polylinesPerso: [],
      endPointCoord: [48.85385, 2.34822],
      baseSpeed: 5, //km-h
      endTime: 13.5// 112min 1h52 = 1.86 11.14 == 11h08

    };
  },
  methods: {
    convertTime: function convertNumToTime(number) {
      let sign = (number >= 0) ? 1 : -1;
      number = number * sign;
      const hour = Math.floor(number);
      let decpart = number - hour;

      const min = 1 / 60;
      decpart = min * Math.round(decpart / min);

      let minute = Math.floor(decpart * 60) + '';
      if (minute.length < 2) {
        minute = '0' + minute;
      }
      sign = sign === 1 ? '' : '-';
      return sign + hour + ':' + minute;
    },
    drawLines(userResto, currentMap, endPoint, speed) {
      const listDistanceTime = this.calculateDistanceTime(userResto, endPoint, speed)
      userResto.forEach((asso, index) => {
        const colorRandom = Math.floor(Math.random() * 16777215).toString(16)
        this.polylinesPerso.push(L.polyline([asso[0].coord, asso[1].coord], {
          color: String("#" + colorRandom),
          weight: 5,
          dashArray: '10, 10',
          dashOffset: '10'
        }).bindPopup(String(Math.trunc(listDistanceTime[index]["Distance-Perso-resto"]) + " m\n")).addTo(currentMap));
        this.polylines.push(L.polyline([asso[1].coord, endPoint], {
          color: String("#" + colorRandom),
          weight: 5,
          dashArray: '10, 10',
          dashOffset: '10'
        }).bindPopup(String(Math.trunc(listDistanceTime[index]["Distance-Resto-endpoint"]) + " m\n")).addTo(currentMap));
      })

      // this.$emit("getList", listDistanceTime)
      return currentMap, listDistanceTime
    },
    calculateDistanceTime(userResto, endpoint, speed) {

      const listDistance = []

      userResto.forEach(asso => {
        const distpr = this.getDistance(asso[0].coord, asso[1].coord)
        const distre = this.getDistance(asso[1].coord, endpoint)
        const time = (distpr + distre) / (speed * 1000) * 60

        const distances = {
          "User": asso[0],
          "Resto": asso[1],
          "Distance-Perso-resto": distpr,
          "Distance-Resto-endpoint": distre,
          "Time": time
        }
        listDistance.push(distances)
      })
      return listDistance

    },

    getDistance(origin, destination) {

      const lon1 = this.toRadian(origin[1]),
          lat1 = this.toRadian(origin[0]),
          lon2 = this.toRadian(destination[1]),
          lat2 = this.toRadian(destination[0]);

      const deltaLat = lat2 - lat1;
      const deltaLon = lon2 - lon1;

      const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
      const c = 2 * Math.asin(Math.sqrt(a));
      const EARTH_RADIUS = 6371;
      return c * EARTH_RADIUS * 1000;
    },

    toRadian(degree) {
      return degree * Math.PI / 180;
    }

  },
  mounted() {
    this.map = L.map("mapContainer").setView([48.86, 2.33], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //use a mix of renderers
    const customPane = this.map.createPane("customPane");
    const canvasRenderer = L.canvas({pane: "customPane"});
    customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400

    const foodIcon = L.icon({
      iconUrl: food,
      iconSize: [35, 35],
    });

    const endPointIcon = L.icon({
      iconUrl: endPoint,
      iconSize: [40, 40],
    });

    const userRestaurant = []


    this.users.forEach(user => {
      L.marker(user.coord, {icon: user.icon}).bindTooltip(user.FirstName + " " + user.LastName, {
        permanent: false,
        offset: [0, 0]
      }).addTo(this.map);
      userRestaurant.push([user, this.restaurants[Math.floor(Math.random() * this.restaurants.length)]])
    })

    this.restaurants.forEach(resto => {
      L.marker(resto.coord, {icon: foodIcon}).bindTooltip(resto.name, {
        permanent: false,
        offset: [0, 0]
      }).addTo(this.map);
    })

    let endpointMarker = L.marker(this.endPointCoord, {
      icon: endPointIcon,
      draggable: true,
      autoPan: true,
    }).addTo(this.map)

    endpointMarker.on('dragend', (event) => {
      this.polylines.forEach((e, index) => {
        this.map.removeLayer(e)
      })
      this.map, this.listDistanceTime = this.drawLines(userRestaurant, this.map, [endpointMarker.getLatLng().lat, endpointMarker.getLatLng().lng], this.baseSpeed)
      this.$emit('getListPersoResto', this.listDistanceTime)
    });











    this.map, this.listDistanceTime = this.drawLines(userRestaurant, this.map, this.endPointCoord, this.baseSpeed)
    this.$emit('getListPersoResto', this.listDistanceTime)


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
  width: 50vw;
  height: 93vh;
}
</style>