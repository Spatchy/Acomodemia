<template>
  <div class="container"><div>
        <h1 class="title is-1">Confirm your email</h1>


      <div class="field is-horizontal is-grouped is-grouped centered">
        <div class="field-body">

          <div class="field">
            <p class="control is-expanded">
            <input class="input is-rounded is-info" type="text" placeholder="Personal Email" v-model="confirm1" />
            </p>
          </div>


          <div class="field">
            <p class="control is-expanded">
                <input class="input is-rounded is-info" type="text" placeholder="University Email" v-model="confirm2" />
            </p>
          </div>
        </div>
      </div>
      <input class="button is-rounded is-info" type="button" @click="confirm" value="confim" />
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
