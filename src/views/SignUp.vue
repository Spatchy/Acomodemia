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
                <input class="input is-rounded is-primary" type="text" placeholder="First Name" v-model="firstName" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Second Name:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="Second Name" v-model="secondName" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <label class="label"><span v-if="gender=='I Identify As...'">Custom </span>Gender:</label>
            <div :class="['field', {'has-addons': gender=='I Identify As...'}]">
              <div class="control is-expanded" v-if="gender!=='I Identify As...'">
                <div class="select is-rounded is-primary is-fullwidth">
                  <select placeholder="please select" v-model="gender">
                    <option v-for="gend in genders" :key="gend">
                      {{gend}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="control" v-if="gender=='I Identify As...'">
                <button class="button is-primary is-rounded is-addon" @click="clearGender()">
                  <span class="icon">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                </button>
              </div>
              <div class="control is-expanded" v-if="gender=='I Identify As...'">
                <input class="input is-rounded is-primary" type="text" placeholder="I Identify As..." v-model="customGender" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Date of Birth:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary is-fullwidth" type="date" placeholder="DD/MM/YYYY" v-model="dob" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Personal Email:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">University Email:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="e.g. bs234@kent.ac.uk" v-model="uniEmail" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>
        </div>


        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Password:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="password" placeholder="Password" v-model="password" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Confirm Password:</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="password" placeholder="Password (repeat)" v-model="password_repeat" v-on:keyup.enter="signUp" />
              </div>
            </div>
          </div>
        </div>


        <input class="button is-rounded is-primary" type="button" @click="signUp" value="Sign Up" />
        <p class="has-text-danger" v-if="msg">{{ msg }}</p>
        <p v-if="msg.length !== 0">
          <ul>
            <li v-for="error in errors" v-bind:key="error" class="has-text-error"> {{error}}</li>
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
      customGender: '',
      genderToSend: '',
      password: '',
      password_repeat: '',
      msg: '',
    };
  },
  methods: {
    async signUp() {
      try {
        if (this.gender == 'I Identify As...') {
          this.genderToSend = this.customGender;
        } else {
          this.genderToSend = this.gender;
        }
        const credentials = {
          username: this.username,
          firstName: this.firstName,
          secondName: this.secondName,
          dob: this.dob,
          uniEmail: this.uniEmail,
          gender: this.genderToSend,
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
    async clearGender() { // used for back button in custom gender input
      this.gender = '';
    },
  },
};
</script>

<style scoped>
.box{
  width: 80%;
}
.button.is-addon{
  width: auto;
}
</style>
