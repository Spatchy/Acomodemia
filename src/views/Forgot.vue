<template>
<div>
    <h2> Reset Password </h2>
    <div>
      <p>please enter your email to send a reset code</p>
      <input type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
      <input type="button" @click="forgot" value="Send code" />
      <br>
      <p> {{msg}} </p>
    </div>
    <div>
      <p>Please enter your email address, code and new password</p>
      <input type="text" placeholder="e.g. bobsmith@gmail.com" v-model="user" />
      <input type="text" placeholder="Enter your code here" v-model="code" />
      <input type="password" v-model="newpass" />
      <input type="password" v-model="confirm" />
      <input type="button" @click="submit" value="Reset Password" />
    </div>
</div>
</template>
<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      username: '',
      newpass: '',
      confirm: '',
      msg: '',
      code: '',
      user: '',
    };
  },
  methods: {
    async submit() {
      try {
        const credentials = {
          username: this.user,
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
        console.error(error);
      }
    },
    async forgot() {
      try {
        const credentials = {
          username: this.username
        }
        const response = await AuthService.forgotPassword(credentials);
        this.msg = response.msg
      } catch (error) {
        console.error(error)
      }
    },
  },
};
</script>
