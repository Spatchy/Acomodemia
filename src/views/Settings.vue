<template>
    <div>
        <h1>Settings</h1>
        <h3>Hi {{ username }}</h3>
        <input type="text" placeholder="Change Bio" v-model="newBio" />
        <input type="number" placeholder="Set Budget" v-model="budget" />
        <input type="text" placeholder="Location" v-model="location" />
        <input type="date" placeholder="Move In Date" v-model="movDate" />
        <input type="text" placeholder = "Email" v-model="PrimaryEmail" />
        <input type="button" @click="settings" value="Submit" />
        <p v-if="msg">{{ msg }}</p>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
export default {
    data() {
        return{
            newBio: '',
            budget: '',
            location: '',
            movDate: '',
            PrimaryEmail: '',
            secretMessage: '',
            username: ''
        }
    },

    async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    this.username = this.$store.getters.getUser.username;
    this.secretMessage = await AuthService.getSecretContent();
    },

    methods: {
        async settings()  {
            try {
                const info = {
                    newBio: this.newBio,
                    budget: this.budget,
                    location: this.location,
                    movDate: this.movDate,
                    PrimaryEmail: this.PrimaryEmail
                }
                const response = await AuthService.settings(info)
                this.msg = response.msg
            } catch(error){
                this.msg = error.response.data.msg
            }
        }
    }
}
</script>