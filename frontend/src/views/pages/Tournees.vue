<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTournees } from '@/api/api.js';
const router = useRouter();

const tournees = ref([
]);

const tourneeChoisie = ref('');

onMounted(async () => {
    // Fetch tournees
    const tourneesData = await fetchTournees();
    tourneesData.sort((a, b) => a.tournee_id - b.tournee_id);
    tournees.value.push(...tourneesData);
});

function onClickSelectionner(){
    console.log(tourneeChoisie.value)
    if(tourneeChoisie.value){
        router.push(`/tournees/${tourneeChoisie.value}`);
    }
};

</script>


<template>
    <div class="col-12 md:col-7 col-offset-2">
        <div class="card p-fluid">
            <h5>Liste des tournées</h5>
            <div class="field grid">
                <div class="p-2">
                </div>
            </div>
            <div class="field grid">
                <label for="tournees" class="col-12 mb-2 md:col-3">Tournées</label>
                <div class="col-12 md:col-8">
                    <Dropdown id="tournees" v-model="tourneeChoisie" :options="tournees" optionLabel="tournee" optionValue="tournee_id" placeholder="Sélectionnez une tournée" />
                </div>
            </div>
            
            <Button label="Sélectionner" @click="onClickSelectionner" ></Button>
        </div>
    </div>
</template>
