<template>
  <div>

    <div class="container">

      <div class="pic">
        <img id="loginpic" src="https://via.placeholder.com/700x400.png" alt="IMG">
      </div>
      
      <div class="login">
        <h1 class="title is-1">Login</h1>

        <div>
          <label class="label login">Username</label>
          <input class="input is-rounded" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
          <label class="label login">Password</label>
          <input class="input is-rounded" type="password" placeholder="*******" v-model="password"  />
        </div>

        <div id="loginbtn">
          <input class="button is-rounded is-info" type="button" @click="login" value="Login" />
          <p v-if="msg">{{ msg }}</p>
          <a href="forgotpassword">Forgotten Password?</a>
        </div>

        <hr>

        <div id="signupbtn">
          <label class="label">Don't have an account? test1</label>
          <button class="button is-rounded is-info" @click="$router.push('sign-up')">Sign Up</button>
        </div>

      </div>

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
