<template>
    <div>
      <div class="field">
        <label class="label">New Email</label>
        <div class="control is-expanded">
          <input class="input is-rounded is-primary" type="text" placeholder="New personal email" v-model="newEmail" v-on:keyup.enter="submit">
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm New Email</label>
        <div class="control is-expanded">
          <input class="input is-rounded is-primary" type="text" placeholder="Confirm your new email" v-model="newEmailConf" v-on:keyup.enter="submit">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control is-expanded">
          <input class="input is-rounded is-primary" type="password" placeholder="Password" v-model="password" v-on:keyup.enter="submit">
        </div>
      </div>
      <div class="field">
        <div class="control is-expanded">
          <input class="button is-rounded is-primary" type="button" @click="submit" value="Change Email">
        </div>
        <p :class="msg.startsWith('Email successfully changed!') ? 'has-text-success' : 'has-text-danger'">{{ msg }}</p>
      </div>
    </div>

</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: 'ChangeEmail',
  data() {
    return {
      newEmail: '',
      newEmailConf: '',
      password: '',
      msg: '',
    };
  },
  methods: {
    async submit() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const regResult = re.test(String(this.newEmail).toLowerCase());
      if (regResult) {
        if (this.newEmail == this.newEmailConf) {
        try {
          const credentials = {
            newEmail: this.newEmail,
            newEmailConf: this.newEmailConf,
            password: this.password,
          };
          const response = AuthService.changeEmail(credentials);
          this.msg = 'Email successfully changed!';
          this.$router.push('/logout');
        } catch (error) {
          console.error(error);
          this.msg = error.response.data.msg;
        }
      } else {
        this.msg = 'Emails do not match!';
      }
      } else {
        this.msg = 'Please enter non gibberish email ';
      }
    },
  },
};
</script>
