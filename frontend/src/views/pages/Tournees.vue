<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTournees } from '@/api/api.js';
const route = useRouter();

const tournees = ref([
]);

const tourneeChoisie = ref('');

onMounted(async () => {
    // Fetch tournees
    const jardinData = await fetchJardinData();
    jardins.value.push(...jardinData);
});

onMounted(async () => {
    // Fetch types d'adhesion
    const typesAdhesionData = await fetchTypesAdhesionData();
    typesAdhesion.value.push(...typesAdhesionData)
});

const createNewAdhesion = async() =>{
    addAdhesionData(jardinChoisi.value, typeAdhesionChoisi.value)
}


</script>


<template>
    <div class="col-12 md:col-7 col-offset-2">
        <div class="card p-fluid">
            <h5>Adhérer à un jardin</h5>
            <div class="field grid">
                <div class="p-2">
                </div>
            </div>
            <div class="field grid">
                <label for="jardins" class="col-12 mb-2 md:col-3">Jardin</label>
                <div class="col-12 md:col-8">
                    <Dropdown id="jardins" v-model="jardinChoisi" :options="jardins" optionLabel="name" optionValue="value" placeholder="Sélectionnez un Jardin" />
                </div>
            </div>
            <div class="field grid">
                <label for="typesAdhesion" class="col-12 mb-2 md:col-3">Type d'Adhésion</label>
                <div class="col-12 md:col-8">
                    <Dropdown id="typesAdhesion" v-model="typeAdhesionChoisi" :options="typesAdhesion" optionLabel="name" optionValue="value" placeholder="Sélectionnez un Type d'Adhésion" />
                </div>
            </div>
            
            <Button label="Envoyer" @click="createNewAdhesion" ></Button>
        </div>
    </div>
</template>
