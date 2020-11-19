<template>
  <div>
    <h1>Sign Up</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="First Name" v-model="firstName" />
    <input type="text" placeholder="Second Name" v-model="secondName" />
    <input type="date" placeholder="Date of birth" v-model="dob" />
    <input type="text" placeholder="University email" v-model="uniEmail" />
    <input type="text" placeholder="Gender" v-model="gender" />

    <input type="password" placeholder="Password" v-model="password" />
    <input type="password" placeholder="Password (repeat)" v-model="password_repeat" />
    <input type="button" @click="signUp" value="Sign Up" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
  data () {
    return {
      username: '',
      firstName: '',
      secondName: '',
      dob: '',
      uniEmail: '',
      gender: '',
      password: '',
      password_repeat: '',
      msg: ''
    }
  },
  methods: {
    async signUp () {
      try {
        const credentials = {
          username: this.username,
          firstName: this.firstName,
          secondName: this.secondName,
          dob: this.dob,
          uniEmail: this.uniEmail,
          gender: this.gender,
          password: this.password,
          password_repeat: this.password_repeat
        }
        const response = await AuthService.signUp(credentials)
        this.msg = response.msg
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>
