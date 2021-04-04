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
                  <input class="input is-rounded is-primary" type="password" placeholder="Password" v-model="password" v-on:keyup.enter="login"/>
                </div>
              </div>
              <div class="field">
                <div class="control" id="loginbtn">
                  <input class="button is-rounded is-primary" type="button" @click="login" value="Login" />
                </div>

              <p class="has-text-danger">{{ msg }}</p> <!--here for now, best to move to notifiaction-->

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

      </div>
    </div>

  <div :class="['modal', {'is-active': $isMobile() && showPrompt}]">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="image is-300x300">
            <img src="../assets/Acomodemia Logo Inverted.svg" alt="Acomodemia Logo">
          </div>
          <p class="title">
            Install Acomodemia as an App
          </p>
          <p class="subtitle">
            Install Acomodemia to your device for a better experience
          </p>
          <button class="button is-white has-text-primary is-rounded" @click="install()">
            <span>Install Now!</span>
            <span class="icon">
              <i class="fas fa-download"></i>
            </span>
          </button>
          <button class="button is-white is-outlined has-text-white is-rounded" @click="dismiss()">
            <span>No thanks</span>
            <span class="icon">
              <i class="fas fa-arrow-right"></i>
            </span>
          </button>
        </div>
      </div>
    </section>
    <button class="modal-close is-large" aria-label="close" @click="dismiss()"></button>
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
      showPrompt: true,
      deferredPrompt: null,
    };
  },
  async created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push('/feed');
    }
    // handle app install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.prompt();
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    // check if app is already installed
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.showPrompt = false;
    });
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
        console.log(this.msg);
        console.log(response.msg);
        const token = response.token;
        const user = response.user;
        this.$store.dispatch('login', {token, user});

        const bResponse = await AuthService.checkVerified();

        this.$store.dispatch('verify');

        this.msg = bResponse.msg;

        this.$router.push('/feed');
      } catch (error) {
        // console.log(error.response.data.msg);
        this.msg = error.response.data.msg;
        if (this.msg == 'You are not verified') {
          this.$router.push('/verify');
        }
      }
    },
    async forgot() {
      this.$router.push('/forgot');
    },
    // for app install prompt
    async dismiss() {
      this.deferredPrompt = null;
      this.showPrompt = false;
    },
    async install() {
      this.deferredPrompt.prompt();
      this.showPrompt = false;
    },
  },
};
</script>

<style scoped>
.box{
  width: 80%;
  margin: 0.25rem;
}
.buttons{
  margin: 0.25rem
}
</style>
