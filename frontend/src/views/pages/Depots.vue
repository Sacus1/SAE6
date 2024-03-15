<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { fetchDepotsByTourneeId } from '@/api/api.js';
const route = useRoute();
const id = route.params.id;
const router = useRouter();

const depots = ref([]);

onMounted(async () => {
    // Fetch depots
    
    const depotsData = await fetchDepotsByTourneeId(id);
    depots.value.push(...depotsData);
});

function goToQRCode(){
    router.push(`/tournees/${id}/QRCode`)
}

function goToMaps(){
    router.push(`/tournees/${id}/Maps`)
}

</script>

<template>
    
    <div class=" col-offset-1">
        <div class=" flex justify-content-center">
            <Button @click="goToQRCode" class="h-3rem mb-5 mr-2" label="QRCode Scanner"></Button>
            <Button @click="goToMaps" class="h-3rem mb-5" label="Livraison"></Button>
        </div>
        <DataTable showGridlines :value="depots" tableStyle="min-width: 10rem; font-size: .5rem;">
            <Column field="ordre" header="Ordre" ></Column>
            <Column field="depot" header="Depots" ></Column>
            <Column field="nombrePaniers" header="Paniers a livrer"></Column>
            <Column field="nombreSimple" header="Paniers simples" ></Column>
            <Column field="nombreFamilial" header="Paniers familiaux" ></Column>
            <Column field="nombreFruite" header="Paniers fruits" ></Column>
        </DataTable>
    </div>
</template>
