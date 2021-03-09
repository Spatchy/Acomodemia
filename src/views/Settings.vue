<template>
  <div>
    <div>
        <mobile-container startOn="Settings" v-if="$isMobile()"></mobile-container>
        <user-settings v-else></user-settings>
    </div>
  </div>
</template>

<script>
import UserSettings from '@/components/UserSettings.vue';
import MobileContainer from '@/components/MobileContainer.vue';

export default {
  name: 'Settings',
  components: {
    UserSettings,
    MobileContainer,
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
