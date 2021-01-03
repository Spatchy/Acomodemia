<template>
  <div>
    <settings-header></settings-header>
    <div>
        <h1>Account Settings</h1>
        <user-settings>
    </div>
  </div>
</template>

<script>
import UserSettings from '@/components/UserSettings.vue'

export default {
  name: 'Settings',
  components: {
    UserSettings
  },
  async created() {
    console.log("isVerified: " + this.$store.getters.isVerified)
    if (!this.$store.getters.isVerified) {
      this.$router.push('/verify') // redirect user to verify if not verified
    }
  }
}
</script>
