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

</script>

<template>
    
    <div class=" col-offset-1">
        <div class=" flex justify-content-center">
            <Button @click="goToQRCode" class="h-3rem mb-5" label="QRCode Scanner"></Button>
        </div>
        <DataTable showGridlines rowsPerPageOptions="4" :value="depots" tableStyle="min-width: 10rem; font-size: .6rem;">
            <Column field="depot" header="Depot" ></Column>
            <Column field="nombrePaniers" header="Paniers a livrer"></Column>
            <Column field="nombreSimple" header="Paniers simples" ></Column>
            <Column field="nombreFamilial" header="Paniers familiaux" ></Column>
            <Column field="nombreFruite" header="Paniers fruits" ></Column>
        </DataTable>
    </div>
</template>
