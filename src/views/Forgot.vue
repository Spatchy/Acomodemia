<template>
  <div class="container">
    <div class="container4">
      <h1 class="title is-1"> Reset Password </h1>
      <div>
        <p class="label left">Please enter your email to receive a reset code</p>
        <input class="input is-rounded is-info" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
        <input class="button is-rounded is-info" type="button" @click="forgot" value="Send code" />
        <!-- Line is loaded but doesnt get displayed -->
        <hr>
        <p class="label left">Please re-enter your email address</p>
        <input class="input is-rounded is-info" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="user" />
        <br>
        <p class="label left">Please enter the code</p>
        <input class="input is-rounded is-info" type="text" placeholder="Enter your code here" v-model="code" />
        <br>
        <p class="label left">Please enter your new password</p>
        <input class="input is-rounded is-info" type="password" v-model="newpass" />
        <br>
        <p class="label left">Please re-enter your new password</p>
        <input class="input is-rounded is-info" type="password" v-model="confirm" />
        <input class="button is-rounded is-info" type="button" @click="submit" value="Reset Password" />
        <br>
        <p style="color:red;"> {{msg}} </p>
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
          username: this.username,
        };
        const response = await AuthService.forgotPassword(credentials);
        this.msg = response.msg;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
