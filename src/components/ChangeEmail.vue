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
      if (this.newEmail == this.newEmailConf) {
        try {
          const credentials = {
            newEmail: this.newEmail,
            newEmailConf: this.newEmailConf,
            password: this.password,
          };
          const response = AuthService.changeEmail(credentials);
          this.msg = response.msg;
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
