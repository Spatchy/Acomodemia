<template>
    <div>
        <h1>Confirm your email</h1>
        <input type="text" placeholder="Confirm1" v-model="confirm1" />
        <input type="text" placeholder="Confirm2" v-model="confirm2" />
        <input type="button" @click="confirm" value="confim" />
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
  name: 'Confirm',
  data () {
    return {
      confirm1: '',
      confirm2: '',
      msg: ''
    }
  },
  methods: {
    async confirm () {
      try {
        const credentials = {
          confirm1: this.confirm1,
          confirm2: this.confirm2
        }
        const response = await AuthService.confirm(credentials)
        this.msg = response.msg

        this.$store.dispatch('verify') //store client-side that the user is verified for UX purposes

        this.$router.push('/complete')
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>
