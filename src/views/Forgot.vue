<template>
<div>
    <h2> Reset Password </h2>

    <input type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
    <input type="password" v-model="newpass" />
    <input type="password" v-model="confirm" />
    <input type="button" @click="submit" value="Reset Password" />

    <br>
    <p> {{msg}} </p>

</div>
</template>
<script>
import AuthService from '@/services/AuthService.js'

export default {
    data() {
        return {
          username: '',
          newpass: '',
          confirm: '',
          msg: ''  
        }
    },
    methods: {
        async submit() {
            try{
                const credentials = {
                    username: this.username,
                    newpass: this.newpass,
                    confirm: this.confirm
                }
                if(this.newpass == this.confirm) {
                    const response = await AuthService.resetPassword(credentials)
                    this.msg = response.msg 
                    this.$router.push('/')
                } else {
                    this.msg = "Passwords do not match!"
                }
            } catch(error){
                console.error(error)
            }
        }
    }
}
</script>