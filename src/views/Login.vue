// src/views/Login.vue

<template>
<div>
  <login-header></login-header>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <p v-if="msg">{{ msg }}</p>
    <router-link to="/sign-up">Sign-up </router-link>
  </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  data () {
    return {
      username: '',
      password: '',
      msg: ''
    }
  },
   async created () {
      if (this.$store.getters.isLoggedIn) {
       this.$router.push('/feed')
      }
  },
  methods: {
    async login () {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        }
        const response = await AuthService.login(credentials)
        this.msg = response.msg

        const token = response.token
        const user = response.user
        this.$store.dispatch('login', { token, user })

        const bResponse = await AuthService.checkVerified()

        this.$store.dispatch('verify')

        this.msg = bResponse.msg

        this.$router.push('/feed')
      } catch (error) {
        console.log(error)
        this.msg = error.response.msg
      }
    }
  }
}
</script>
