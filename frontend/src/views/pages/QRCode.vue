<script setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import { Camera } from '@capacitor/camera';
import { onMounted, ref } from 'vue';
const qrError = ref('');
const qrContent = ref('');
const isCameraReady = ref(false);
const qrcodeStreamRef = ref(null);
const QRCode = {
    components: {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    }
};
function onDetect(content) {
    qrContent.value = content;
    qrcodeStreamRef.value.pause(); // Pause the camera when a QR code is detected
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
        <QrcodeStream v-if="isCameraReady" ref="qrcodeStreamRef" @detect="onDetect" @error="onError"></QrcodeStream>
        <p v-else>Requesting camera permission...</p>
        <p>{{ qrError }}</p>
    </div>
</template>
