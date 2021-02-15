<template>
  <div class="container">
    <div class="box">
      <div class="level">
        <div class="level-item">
          <h1 class="title is-1"> Reset Password </h1>
        </div>
      </div>
      <div class="section">
        <p>Please fill out this form to reset your password</p>
      </div>
      <div class="columns">
        <div class="column">
          <fieldset :disabled="codeSent">
            <div class="field">
              <label class="label">Personal Email</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
              </div>
            </div>
            <div class="field">
              <div class="control is-expanded">
                <input class="button is-rounded is-primary" type="button" @click="forgot" value="Send Code" />
              </div>
            </div>
          </fieldset>
          <hr>
          <fieldset :disabled="!codeSent">
            <div class="field">
              <label class="label">Code</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="text" placeholder="Enter your code here" v-model="code" />
              </div>
            </div>

            <div class="field">
              <label class="label">New password</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="password" v-model="newpass" />
              </div>
            </div>

            <div class="field">
              <label class="label">Re-enter New password</label>
              <div class="control is-expanded">
                <input class="input is-rounded is-primary" type="password" v-model="confirm" />
              </div>
            </div>

            <div class="field">
              <div class="control is-expanded">
                <input class="button is-rounded is-primary" type="button" @click="submit" value="Reset Password" />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <p :class="msg.startsWith('Reset code sent!') ? 'has-text-success' : 'has-text-danger'">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      username: '',
      codeSent: false,
      newpass: '',
      confirm: '',
      msg: '',
      code: '',
    };
  },
  methods: {
    async submit() {
      try {
        const credentials = {
          username: this.username,
          newpass: this.newpass,
          confirm: this.confirm,
          code: this.code,
        };
        if (this.newpass == this.confirm) {
          const response = await AuthService.resetPassword(credentials);
          this.msg = response.msg;
          this.$router.push('/');
        } else {
          this.msg = 'Passwords do not match!';
        }
      } catch (error) {
        console.log(error.response);
        this.msg = error.response.data.msg;
        console.error(error);
      }
    },
    async forgot() {
      try {
        const credentials = {
          username: this.username,
        };
        const response = await AuthService.forgotPassword(credentials);
        this.msg = response.msg;
        this.codeSent = true;
      } catch (error) {
        this.msg = error.response.data.msg;
        console.error(error);
      }
    },
  },
};
</script>
