<script setup>
import { onMounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Assuming you've installed and imported it

onMounted(async () => {
    await nextTick();

    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ensure the map instance is ready before adding routing
    L.Routing.control({
        waypoints: [
          L.latLng(48.1604568,6.4489619),
          L.latLng(48.1819469,6.4323215),
          L.latLng(48.1938105,	6.4599403)
        ],
        routeWhileDragging: false,
        itinerary: {
            show: false // This hides the itinerary box
        }
    }).addTo(map);
});
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
