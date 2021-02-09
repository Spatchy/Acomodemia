<template>
  <div>
    <settings-header></settings-header>
    <div>
        <h1 style="text-align: center;" class="title is-1">Account Settings</h1>
        <br>
        <user-settings>
    </div>
  </div>
</template>

<script>
import UserSettings from '@/components/UserSettings.vue';

export default {
  name: 'Settings',
  components: {
    UserSettings,
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    if (!this.$store.getters.isVerified) {
      this.$router.push('/verify'); // redirect user to verify if not verified
    }
  },
};
</script>
