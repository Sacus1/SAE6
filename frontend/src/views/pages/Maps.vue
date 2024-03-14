<script setup>
import { nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet-polylinedecorator'
import { fetchAdresseById, fetchDepotById, fetchDistributionByTournee } from "@/api/api"; // Assuming you've installed and imported it
const route = useRoute();

onMounted(async () => {
    await nextTick();
  let points = [];
    // create the map
    const map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', (e) => {
      const radius = e.accuracy / 2;
      L.marker(e.latlng)
        .addTo(map)
        .bindPopup('You are within ' + radius + ' meters from this point')
        .openPopup();
      L.circle(e.latlng, radius).addTo(map);
      points.push([e.latlng.lat, e.latlng.lng]);
    });
    map.on('locationerror', (e) => {
      //console.log(e);
    });
    // get tournee id from the url
    fetchDistributionByTournee(route.params.id).then(async (tournee) => {
        if (tournee) {
            for (let i = 0; i < tournee.length; i++) {
                await fetchDepotById(tournee[i]['depot_id']).then(async (depot) => {
                    if (depot) {
                        depot = depot[0];
                        await fetchAdresseById(depot['adresse_id']).then((adresse) => {
                            adresse = adresse[0];
                            if (adresse) {
                                points.push([adresse['localisation']['coordinates'][1], adresse['localisation']['coordinates'][0]]);
                            }
                        });
                    }
                });
            }
        }

        // sort the points
        points = solveTSP(points);


        // Ensure the map instance is ready before adding routing
      let routingControl =L.Routing.control({
            waypoints: points.map((point) => L.latLng(point[0], point[1])),
            plan: L.Routing.plan(
                points.map((point) => L.latLng(point[0], point[1])),
                {
                    createMarker: function (i, wp, nWps) {
                      return L.marker(wp.latLng, {
                          draggable: false,
                          addWaypoints: false,
                          icon: L.icon({
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                          })
                        });
                    }
                }
            )
        }).addTo(map);
        routingControl.on('routesfound', function(e) {
          let routes = e.routes;
          let decorator = L.polylineDecorator(routes[0].coordinates, {
            patterns: [
              {offset: '0%', repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions:
                    {stroke: true}})}
            ]
          }).addTo(map);
        });

    });
});
function calculateDistance(a, b) {
    // Haversine distance formula
    const [lat1, lon1] = a;
    const [lat2, lon2] = b;
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);

    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function findNearestNeighbor(currentPoint, points) {
    return points.reduce(
        (nearest, point, index) => {
            const distance = calculateDistance(currentPoint, point);
            return distance < nearest.distance ? { index, distance } : nearest;
        },
        { index: -1, distance: Infinity }
    );
}

function solveTSP(points) {
    const path = [points[0]]; // Start from the first point
    let currentPoint = points[0];
    let remainingPoints = points.slice(1);

    while (remainingPoints.length > 0) {
        const nearest = findNearestNeighbor(currentPoint, remainingPoints);
        path.push(remainingPoints[nearest.index]);
        currentPoint = remainingPoints[nearest.index];
        remainingPoints = remainingPoints.filter((_, index) => index !== nearest.index);
    }

    return path;
}
</script>
<template>
    <div className="card">
        <h5>Carte livraison</h5>
        <div id="map" style="height: 600px"></div>
    </div>
</template>
<style>
.leaflet-routing-container {
    display: none !important;
}
</style>
