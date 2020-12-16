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
  }
}
</script>
