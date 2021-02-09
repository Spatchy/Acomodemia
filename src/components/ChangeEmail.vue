<template>
    <div>
        <h2>Please enter and confirm the email address you wish to change to, and your password</h2>
        <input type="text" placeholder="e.g. bobsmith@gmail.com" v-model="newEmail" />
        <input type="text" placeholder="Confirm your new email" v-model="newEmailConf" />
        <input type="password" placeholder="*******" v-model="password"  />
        <input type="button" @click="submit" value="Change Email" />
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
