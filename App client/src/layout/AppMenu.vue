<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
        { label: 'Tournees', icon: 'pi pi-fw pi-home', to: '/'},
        { label: 'Scan QR code', icon: 'pi pi-fw pi-qrcode', to: '/tournees/1/QRCode' },
        { label: 'Map', icon: 'pi pi-fw pi-map', to: '/tournees/1/Maps' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
