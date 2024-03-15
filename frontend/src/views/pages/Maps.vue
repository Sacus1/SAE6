<script setup>
import { nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GetLocalisationsByTournee } from "@/api/api";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-polylinedecorator";
import { fetchAdresseById, fetchDepotById, fetchDistributionByTournee } from "@/api/api"; // Assuming you've installed and imported it
const route = useRoute();

onMounted(async () => {
  await nextTick();
  // create the map
  const map = L.map("map");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  /*map.locate({ setView: true, maxZoom: 16 });
 map.on("locationfound", (e) => {
    const radius = e.accuracy / 2;
    L.marker(e.latlng)
      .addTo(map)
      .bindPopup("You are within " + radius + " meters from this point")
      .openPopup();
    L.circle(e.latlng, radius).addTo(map);
    points.push([e.latlng.lat, e.latlng.lng]);
  });
  map.on("locationerror", (e) => {
    //console.log(e);
  });*/
  // get tournee id from the url
  // sort the points
  const data = await GetLocalisationsByTournee(route.params.id);
  const points = data[0];
  const color = data[1];
  // Ensure the map instance is ready before adding routing
  let routingControl = L.Routing.control({
    waypoints: points.map((point) => L.latLng(point[0], point[1])),
    plan: L.Routing.plan(
      points.map((point) => L.latLng(point[0], point[1])),
      {
        createMarker: function(i, wp, nWps) {
          return L.marker(wp.latLng, {
            draggable: false,
            addWaypoints: false,
            icon: L.icon({
              iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          });
        }
      }
    ),
    // set color of the route
    lineOptions: {
      styles: [{ color: color, opacity: 1, weight: 5 }]
    },
  }).addTo(map);
  routingControl.on("routesfound", function(e) {
    let routes = e.routes;
    let decorator = L.polylineDecorator(routes[0].coordinates, {
      patterns: [
        {
          offset: "0%", repeat: 100, symbol: L.Symbol.arrowHead({
            pixelSize: 15, polygon: false, pathOptions:
              { stroke: true }
          })
        }
      ]
    }).addTo(map);
  });
});

</script>
<template>
  <div className="card col-offset-1">
    <h5>Carte livraison</h5>
    <div id="map" style="height: 600px"></div>
  </div>
</template>
<style>
.leaflet-routing-container {
  display: none !important;
}
</style>
