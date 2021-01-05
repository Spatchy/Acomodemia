<template>
  <div id="signUp">
    <h1>Sign Up</h1>
    <label>Personal Email Address:</label>
    <input type="text" placeholder="Your Personal Email" v-model="username" />
    <br>
    <label>First Name:</label>
    <input type="text" placeholder="First Name" v-model="firstName" />
    <br>
    <label>Second Name:</label>
    <input type="text" placeholder="Second Name" v-model="secondName" />
    <br>
    <label>Date Of Birth:</label>
    <input type="date" placeholder="Date of birth" v-model="dob" />
    <br>
    <label>University Email:</label>
    <input type="text" placeholder="University email" v-model="uniEmail" />
    <!-- <input type="text" placeholder="Gender" v-model="gender" /> -->

    <br>

    <label>Gender:</label>
      <select v-model="gender">
        <option v-for="gend in genders" :key="gend">{{gend}}</option>
      </select>

    <br>

    <label>Password:</label>
    <input type="password" placeholder="Password" v-model="password" />
    <br>
    <label>Repeat Password:</label>
    <input type="password" placeholder="Password (repeat)" v-model="password_repeat" />
    <br>
    <input type="button" @click="signUp" value="Sign Up" />
    <br>
    <p v-if="msg">{{ msg }}</p>
    <!-- <p v-if="msg.length !== 0">
      <ul>
        <li v-for="error in errors" v-bind:key="error"> {{error}}</li>
      </ul>
    </p>   -->
  </div>

</template>

<script>
import AuthService from '@/services/AuthService.js'
import Confirm from '@/components/Confirm.vue'
export default {
  components: {
    Confirm
  },
  data () {
    return {
      genders: ['Female', 'Male', 'Secret'],
      username: '',
      firstName: '',
      secondName: '',
      dob: '',
      uniEmail: '',
      gender: '',
      password: '',
      password_repeat: '',
      msg: '',
      component: 'Confirm',
      showConfirm: false
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

        const token = response.token
        const user = response.user
        this.$store.dispatch('login', { token, user })

        this.$router.push('/verify')
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>

<style scoped>
  label {
    width:180px;
    clear:left;
    text-align:right;
    padding-right:10px;
}

input, label {
    float:left;
}
</style>
