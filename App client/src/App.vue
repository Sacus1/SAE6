<script setup>
import {
  PushNotifications,

} from '@capacitor/push-notifications';
import { onMounted, ref } from 'vue';

onMounted( async () => {
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  })

  PushNotifications.addListener('registration',
    (token) => {
      alert('Push registration success, token: ' + token.value);
    }
  );

  PushNotifications.addListener('registrationError',
    (error) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
      alert('Push received: ' + JSON.stringify(notification));
    }
  );

  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    }
  );


});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
