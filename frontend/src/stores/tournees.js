// stores/tourneesStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTourneesStore = defineStore('tournees', {
    state: () => ({
        profileImage: '/default-pfp.svg',
        isSet: false
    }),
    actions: {
        update(value) {
            this.profileImage = value;
            this.isSet = true;
        }
    }
});
