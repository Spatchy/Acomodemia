<template>
  <div>
    <div class="container">
      <div class="box">
        <div class="level">
          <div class="level-item">
            <h1 class="title is-1">Login</h1>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="level">
              <div class="level-item">
                <div class="image is-300x300">
                  <img id="loginpic" src="../assets/Acomodemia Logo.svg" alt="Acomodemia Logo">
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="login">
              <div class="field">
                <label class="label">Personal Email</label>
                <div class="control">
                  <input class="input is-rounded is-primary" type="text" placeholder="Personal Email" v-model="username" />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input is-rounded is-primary" type="password" placeholder="Password" v-model="password"  />
                </div>
              </div>
              <div class="field">
                <div class="control" id="loginbtn">
                  <input class="button is-rounded is-primary" type="button" @click="login" value="Login" />
                </div>
              </div>
              <hr>
              <div class="field">
                <label class="label">Don't have an account?</label>
                <div class="control">
                  <button class="button is-rounded is-primary" @click="$router.push('sign-up')">Sign Up</button>
                </div>
              </div>
              <hr>
              <div class="field">
                <label class="label">Problems with password?</label>
                <div class="control">
                  <input class="button is-rounded is-primary" type="button" @click="forgot" value="Forgot Password" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="msg">{{ msg }}</p> <!--here for now, best to move to notifiaction-->
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      msg: '',
    };
  },
  async created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push('/feed');
    }
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;
        this.$store.dispatch('login', {token, user});

        const bResponse = await AuthService.checkVerified();

        this.$store.dispatch('verify');

        this.msg = bResponse.msg;

        this.$router.push('/feed');
      } catch (error) {
        console.log(error);
        this.msg = error.response.msg;
      }
    },
    async forgot() {
      this.$router.push('/forgot');
    },
  },
};
</script>

<style scoped>
.box{
  width: 80%;
  margin: 0.25rem;
}
</style>
