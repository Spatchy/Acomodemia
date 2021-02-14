<template>
  <div>
    <div class="container">
      <div class="box">
        <div class="level">
          <div class="level-item">
            <h1 class="title is-1">Sign Up</h1>
          </div>
        </div>


        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">First Name:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="First Name" v-model="firstName" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Second Name:</label>
              <p class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="Second Name" v-model="secondName" />
              </p>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Gender:</label>
              <div class="control is-expanded">
                <div class="select is-rounded is-primary is-fullwidth">
                  <select placeholder="please select" v-model="gender">
                    <option v-for="gend in genders" :key="gend">
                      {{gend}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Date of Birth:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary is-fullwidth" type="date" placeholder="DD/MM/YYYY" v-model="dob" />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Personal Email:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">University Email:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="e.g. bs234@kent.ac.uk" v-model="uniEmail" />
              </div>
            </div>
          </div>
        </div>


        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Password:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="password" placeholder="Password" v-model="password" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Confirm Password:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="password" placeholder="Password (repeat)" v-model="password_repeat" />
              </div>
            </div>
          </div>
        </div>


        <input class="button is-rounded is-primary" type="button" @click="signUp" value="Sign Up" />
        <p v-if="msg">{{ msg }}</p>
        <p v-if="msg.length !== 0">
          <ul>
            <li v-for="error in errors" v-bind:key="error"> {{error}}</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      genders: ['Female', 'Male', 'Rather Not Say', 'I Identify As...'],
      username: '',
      firstName: '',
      secondName: '',
      dob: '',
      uniEmail: '',
      gender: '',
      password: '',
      password_repeat: '',
      msg: '',
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          firstName: this.firstName,
          secondName: this.secondName,
          dob: this.dob,
          uniEmail: this.uniEmail,
          gender: this.gender,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;
        this.$store.dispatch('login', {token, user});

        this.$router.push('/verify');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

<style scoped>
.box{
  width: 80%;
}
</style>
