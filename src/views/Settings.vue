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
// importing header for Settings page
import Header from '@/components/Header'

export default {
  comments: {
    'settings-header': Header
  },
  name: 'Settings',
  components: {
    UserSettings
  }
}
</script>
