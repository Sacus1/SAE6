<script setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import { Camera } from '@capacitor/camera';
import { onMounted, ref } from 'vue';
import { sendQRcode } from '@/api/backendApi';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const qrError = ref('');
const qrContent = ref('');
const isCameraReady = ref(false);
const qrcodeStreamRef = ref(null);
const pausedRef = ref(false);

// console.log(route.params.id);

const QRCode = {
    components: {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    }
};

function onDetect(content) {
    qrContent.value = content;
    // if there is "jardin" in the content , go back to the dashboard.
    if (content.rawValue.includes('jardin')) {
        router.push('/');
        return;
    }
    sendQRcode(content.rawValue)
        .then(() => {
            // change page to CodeBar.vue
            router.push('/panier');
        })
        .catch((error) => {
            qrError.value = error;
        });
}
function onError(error) {
    qrError.value = error;
}
async function getCameraPermission() {
    const cameraPermission = await Camera.requestPermissions();

    if (cameraPermission.state === 'granted') {
        isCameraReady.value = true;
    } else {
        // Handle permission denied
        qrError.value = 'Camera permission denied';
        isCameraReady.value = false;
    }
}
// on page load ask for camera permission
onMounted(() => {
    // check if already have camera permission
    if (!Camera.checkPermissions()) {
        getCameraPermission();
    } else {
        isCameraReady.value = true;
    }
});
</script>
<template>
    <div className="card">
        <h5>Scan QR code</h5>
        <p>Use this page to scan QR code.</p>
        <QrcodeStream format="['qr-code']" v-if="isCameraReady" ref="qrcodeStreamRef" :paused="pausedRef" @detect="onDetect" @error="onError"></QrcodeStream>
        <p v-else>Requesting camera permission...</p>
        <p>{{ qrError }}</p>
    </div>
</template>
