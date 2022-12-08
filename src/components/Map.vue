<template>
  <div style="display: flex; flex-direction: column, position: relative">
    <div class="absolute-text">
      <div class="flex">
        <img class="icon" src="@/assets/img/clock.png" alt=""/>
        <h3>RDV à {{ convertTime(endTime) }}</h3>
      </div>
      <p v-for="dt in listDistanceTime">
        {{ dt["User"]._FirstName }} doit partir à
        {{ convertTime((endTime * 60 - dt["Time"]) / 60) }}
      </p>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import User from "@/assets/script/User";
import Restaurant from "@/assets/script/Restaurant";
import food from "@/assets/img/food.png";
import endPoint from "@/assets/img/end-point.png";
import SocketioService from "@/services/socketio.service";
import socketioService from "@/services/socketio.service";
import {mapWritableState} from "pinia/dist/pinia";
import {useMiamStore} from "@/components/store";


export default {
  name: "LeafletMap",

  created() {

  },
  data() {
    return {
      map: null,
      listDistanceTime: [],
      users: [],
      restaurants: [new Restaurant("La Table de Colette", [48.84, 2.34]),
        new Restaurant("6 New York", [48.86, 2.29]),
        new Restaurant("Sens Uniques", [48.88, 2.33]),
        new Restaurant("Mensae", [48.87, 2.38]),
        new Restaurant("Polpo", [48.90, 2.28])
      ],
      userRestaurant: [],
      polylines: [],
      polylinesPerso: [],
      markerResto: [],
      endPointCoord: [48.85385, 2.34822],
      endpointMarker: null,
      baseSpeed: 5, //km-h
      endTime: 13.5, // 112min 1h52 = 1.86 11.14 == 11h08

    };
  },
  watch: {
    users(newUsers) {
      this.userRestaurant = []
      newUsers.forEach((user) => {

        const iconUser = L.icon(user._icon.options)
        L.marker(user._coord, {icon: iconUser})
            .bindTooltip(user._FirstName + " " + user._LastName, {
              permanent: false,
              offset: [0, 0],
            })
            .addTo(this.map);
        var listCurrent = this.listDistanceTime.find((e => (e["User"].id === user.id)))

        if(listCurrent){
          console.log("VWLIUFGHQIOUGRIUR")
          this.userRestaurant.push([
            user,
            listCurrent["Resto"],
          ]);
        } else {
          this.userRestaurant.push([
            user,
            null,
          ]);
        }

      });
    },
    endPointCoord() {
      this.endpointMarker.setLatLng(this.endPointCoord);
      this.polylines.forEach((e, index) => {
        this.map.removeLayer(e);
      });

      this.listDistanceTime = this.drawLines(
          this.userRestaurant,
          [this.endpointMarker.getLatLng().lat, this.endpointMarker.getLatLng().lng],
          this.baseSpeed
      )
      this.$emit("getListPersoResto", this.listDistanceTime);
    }
  },
  methods: {
    updatePersoResto(listDistanceTime) {
      this.userRestaurant = [];

      listDistanceTime.forEach((elem) => {
        this.userRestaurant.push([elem["User"], elem["Resto"]]);
      });
      this.polylines.forEach((e, index) => {
        this.map.removeLayer(e);
      });
      this.polylinesPerso.forEach((e, index) => {
        this.map.removeLayer(e);
      });

      this.listDistanceTime = this.drawLines(
          this.userRestaurant,
          this.endPointCoord,
          this.baseSpeed
      );


      this.$emit("getListPersoResto", this.listDistanceTime);
    },
    loadRestaurant() {
      this.markerResto.forEach((marker) => {
        marker.remove();
      });
      const foodIcon = L.icon({
        iconUrl: food,
        iconSize: [35, 35],
      });
      this.restaurants.forEach((resto) => {
        this.markerResto.push(
            L.marker(resto.coord, {icon: foodIcon})
                .bindTooltip(resto.name, {
                  permanent: false,
                  offset: [0, 0],
                })
                .addTo(this.map)
        );
      });
    },
    convertTime: function convertNumToTime(number) {
      let sign = number >= 0 ? 1 : -1;
      number = number * sign;
      const hour = Math.floor(number);
      let decpart = number - hour;

      const min = 1 / 60;
      decpart = min * Math.round(decpart / min);

      let minute = Math.floor(decpart * 60) + "";
      if (minute.length < 2) {
        minute = "0" + minute;
      }
      sign = sign === 1 ? "" : "-";
      return sign + hour + ":" + minute;
    },
    drawLines(userResto, endPoint, speed) {
      console.log(userResto)
      const listDistanceTime = this.calculateDistanceTime(
          userResto,
          endPoint,
          speed
      );

      userResto.forEach((asso, index) => {
        if (asso[1]) {
          const colorRandom = Math.floor(Math.random() * 16777215).toString(16)
          this.polylinesPerso.push(
              L.polyline([asso[0]._coord, asso[1]._coord], {
                color: String("#" + colorRandom),
                weight: 5,
                dashArray: "10, 10",
                dashOffset: "10",
              })
                  .bindPopup(
                      String(
                          Math.trunc(listDistanceTime[index]["Distance-Perso-resto"]) +
                          " m\n"
                      )
                  )
                  .addTo(this.map)
          );

          this.polylines.push(
              L.polyline([asso[1]._coord, endPoint], {
                color: String("#" + colorRandom),
                weight: 5,
                dashArray: "10, 10",
                dashOffset: "10",
              })
                  .bindPopup(
                      String(
                          Math.trunc(listDistanceTime[index]["Distance-Resto-endpoint"]) +
                          " m\n"
                      )
                  )
                  .addTo(this.map)
          );
        }
      });


      // this.$emit("getList", listDistanceTime)
      return listDistanceTime;
    },
    calculateDistanceTime(userResto, endpoint, speed) {
      const listDistance = [];

      userResto.forEach((asso) => {
        console.log(asso)
        if (asso[1]) {

          const distpr = this.getDistance(asso[0]._coord, asso[1]._coord);
          const distre = this.getDistance(asso[1]._coord, endpoint);

          const time = ((distpr + distre) / (speed * 1000)) * 60;

          const distances = {
            User: asso[0],
            Resto: asso[1],
            "Distance-Perso-resto": distpr,
            "Distance-Resto-endpoint": distre,
            Time: time,
          };
          listDistance.push(distances);
        } else {
          const distances = {
            User: asso[0],
            Resto: null,
            "Distance-Perso-resto": 0,
            "Distance-Resto-endpoint": 0,
            Time: null,
          };
          listDistance.push(distances);
        }
      });
      return listDistance;
    },

    getDistance(origin, destination) {
      const lon1 = this.toRadian(origin[1]),
          lat1 = this.toRadian(origin[0]),
          lon2 = this.toRadian(destination[1]),
          lat2 = this.toRadian(destination[0]);

      const deltaLat = lat2 - lat1;
      const deltaLon = lon2 - lon1;

      const a =
          Math.pow(Math.sin(deltaLat / 2), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
      const c = 2 * Math.asin(Math.sqrt(a));
      const EARTH_RADIUS = 6371;

      return c * EARTH_RADIUS * 1000;
    },

    toRadian(degree) {
      return (degree * Math.PI) / 180;
    },
  },
  computed: {
    ...mapWritableState(useMiamStore, ['user', 'room'])
  },
  mounted() {
    this.map = L.map("mapContainer").setView([48.86, 2.33], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //use a mix of renderers

    this.endpointMarker = L.marker(this.endPointCoord, {
      icon: L.icon({
        iconUrl: endPoint,
        iconSize: [33, 50],
      }),
      draggable: true,
      autoPan: true,
    }).addTo(this.map),
        this.endpointMarker.addTo(this.map)
    const customPane = this.map.createPane("customPane");
    const canvasRenderer = L.canvas({pane: "customPane"});
    customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400


    socketioService.socket.on('updateRoom', room => {
      console.log("room", room)
      const usersRoom = []

      room.users.forEach(e => {
        usersRoom.push(e[0])
      })

      this.listDistanceTime = this.calculateDistanceTime(room.users, room.endPoint, this.baseSpeed)
      this.updatePersoResto(this.listDistanceTime);


      this.endPointCoord = room.endPoint
      this.users = usersRoom

    })


    this.loadRestaurant();


    this.endpointMarker.on("dragend", (event) => {
      this.endPointCoord = [
        this.endpointMarker.getLatLng().lat,
        this.endpointMarker.getLatLng().lng,
      ];
      SocketioService.socket.emit("changeFinish", this.room, this.endPointCoord);
      console.log("coucou", this.userRestaurant)

    });

    this.listDistanceTime = this.drawLines(
        this.userRestaurant,

        this.endPointCoord,
        this.baseSpeed
    );


    this.$emit("getListResto", this.restaurants);

    SocketioService.socket.on("addResto", (resto) => {
      this.restaurants.push(new Restaurant(resto._name, resto._coord));

      this.loadRestaurant();
      this.$emit("getListResto", this.restaurants);
    });

    SocketioService.socket.on("changeResto", (listPersoResto) => {
      console.log("list", listPersoResto)
      this.listDistanceTime = this.calculateDistanceTime(listPersoResto, this.endPointCoord, this.baseSpeed)
      this.updatePersoResto(this.listDistanceTime)
    });
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
  width: 58vw;
  height: 100vh;
  z-index: 1;
}

.flex {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

h3 {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
}

.absolute-text {
  position: absolute;
  z-index: 10;
  bottom: 32px;
  left: 32px;
  width: 30%;
  background-color: white;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
  rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
  rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  padding: 16px;
}
</style>
