<template>
    <div>
        <h1>Complete Your Profile</h1>
        <p>You can change any of these settings at any time on your account page</p>
        <user-settings>
    </div>
</template>

<script>
import UserSettings from '@/components/UserSettings.vue';

export default {
  name: 'Complete',
  components: {
    UserSettings,
  },
};
</script>
