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
    
    <div class="card">
        <div class=" flex justify-content-center">
            <Button @click="goToQRCode" class="w-2 h-3rem mb-5" label="QRCode Scanner"></Button>
        </div>
        <DataTable showGridlines :value="depots" tableStyle="min-width: 50rem">
            <Column field="depot" header="Depot" bodyClass="text-center"></Column>
            <Column field="nombrePaniers" header="Paniers a livrer" bodyClass="text-center"></Column>
            <Column field="nombreSimple" header="Paniers simples" bodyClass="text-center"></Column>
            <Column field="nombreFamilial" header="Paniers familiaux" bodyClass="text-center"></Column>
            <Column field="nombreFruite" header="Paniers fruits" bodyClass="text-center"></Column>
        </DataTable>
    </div>
</template>
