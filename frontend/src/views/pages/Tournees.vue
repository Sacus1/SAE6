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
    //console.log(tourneesData)
    tourneesData.sort((a, b) => a.tournee_id - b.tournee_id);
    tournees.value.push(...tourneesData);
});

function onClickSelectionner(){
    //console.log(tourneeChoisie.value)
    if(tourneeChoisie.value){
        router.push(`/tournees/${tourneeChoisie.value}`);
    }
};

</script>


<template>
    <div class="col-offset-1">
        <div class="card p-fluid">
            <h5>Liste des tournées</h5>
            <div class="field grid">
                <div class="p-2">
                </div>
            </div>
            <div class="field grid">
                <label for="tournees" class="col-12 mb-2 md:col-3">Tournées</label>
                <div class="col-12 md:col-8">
                    <Dropdown id="tournees" v-model="tourneeChoisie" :options="tournees" optionLabel="tournee" optionValue="tournee_id" placeholder="Sélectionnez une tournée">
                        <template #option="{ option }">
                            <span :style="{ backgroundColor: option.couleur, color: 'white', padding: '4px', borderRadius: '4px', position: 'relative', display: 'inline-block' }">
                                <span style="position: relative; z-index: 1;">{{ option.tournee }}</span>
                                <span style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3); border-radius: 4px;"></span>
                            </span>
                        </template>
                    </Dropdown>
                </div>
            </div>
            
            <Button label="Sélectionner" @click="onClickSelectionner"></Button>
        </div>
    </div>
</template>


