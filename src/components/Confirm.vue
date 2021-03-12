<template>
  <div class="container">
    <div class="box">
      <div class="level">
        <div class="level-item">
          <h1 class="title is-1">Verify Your Emails</h1>
        </div>
      </div>

      <div class="section">
        <p>We have sent verification codes to both your personal and university emails</p>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Personal Email Code</label>
            <div class="control is-expanded">
              <input class="input is-rounded is-primary" type="text" placeholder="Personal Email" v-model="confirm1" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">University Email Code</label>
            <div class="control is-expanded">
              <input class="input is-rounded is-primary" type="text" placeholder="University Email" v-model="confirm2" />
            </div>
          </div>
        </div>
      </div>

      <input class="button is-rounded is-primary" type="button" @click="confirm" value="Confim" />
      <p class="has-text-danger" v-if="msg">{{ msg }}</p>
      <br>
      <hr>
      <input class="button is-rounded is-primary" type="button" @click="back" value="Back to Main Stage" />
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  name: 'Confirm',
  data() {
    return {
      confirm1: '',
      confirm2: '',
      msg: '',
    };
  },
  methods: {
    async back() {
      this.$router.push('/logout');
    },
    async confirm() {
      try {
        const credentials = {
          confirm1: this.confirm1,
          confirm2: this.confirm2,
        };
        const response = await AuthService.confirm(credentials);
        this.msg = response.msg;

        this.$store.dispatch('verify'); // store client-side that the user is verified for UX purposes

        this.$router.push('/complete');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>
