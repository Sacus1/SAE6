<template>
  <img src="/logo-cocagne.svg" alt="logo" />
</template>




<script setup>
import {
  PushNotifications,

} from '@capacitor/push-notifications';
import { onMounted, ref } from 'vue';
import { sendToken } from "@/api/backendApi";
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
      sendToken(token.value)
        .then(() => {
          console.log('Token sent');
        })
        .catch((error) => {
          console.log(error);
        });

    }
  );

  PushNotifications.addListener('registrationError',
    (error) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    }
  );

  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    }
  );


});
</script>
