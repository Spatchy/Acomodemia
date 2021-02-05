<template>
  <div class="navbar is-primary" v-if="!exclude.includes($route.name)">

    <div class="navbar-brand">
      <router-link class="navbar-item" to="/feed">
        <img src="../assets/Acomodemia Wordmark Inverted.svg" width="100%" style="max-height: 3.25rem">
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="burgerClick($event)">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" ref="menu">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/settings">
          Settings
        </router-link>
        <router-link class="navbar-item" to="/logout">
          Log Out
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      exclude: ['Login', 'Sign-up'] // List of pages to not show the header, uses the route name as definied in router/index.js
    }
  },
  methods: {
    burgerClick (event) {
      event.target.classList.toggle('is-active')
      this.$refs.menu.classList.toggle('is-active')
    }
  }
}
</script>
