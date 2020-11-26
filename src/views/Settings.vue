<template>
    <div>
        <div>
            <h1>Settings</h1>
            <h3>Hi {{ username }}</h3>
            <input type="text" :placeholder="oldBio" v-model="newBio" />
            <input type="number" :placeholder="oldBudget" v-model="budget" />
            <input type="text" :placeholder="oldLocation" v-model="location" />
            <input type="date" :placeholder="oldDate" v-model="movDate" />
            <input type="button" @click="settings" value="Submit" />
            <p v-if="msg">{{ msg }}</p>
        </div>
        <div>
            <h2>Set Lifestyle</h2>
            <p>Please select how often you like to drink alcohol</p>
            <input type="radio" id="0" value="0" v-model="lifestyleVal"> 
            <label for="0">Not at all</label>
            <input type="radio" id="1" value="1" v-model="lifestyleVal">
            <label for="1">Once a month</label>
            <input type="radio" id="2" value="2" v-model="lifestyleVal">
            <label for="2">Once a fortnight</label>
            <input type="radio" id="3" value="3" v-model="lifestyleVal">
            <label for="3">Once a week</label>
            <input type="radio" id="4" value="4" v-model="lifestyleVal">
            <label for="4">Every day</label><br>
            <input type="button" @click="lifestyle" value="Submit" />

        </div>
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
            username: '',
            oldBio: '',
            oldBudget: '',
            oldLocation: '',
            oldDate: '',
            lifestyleVal: ''
        }
    },

    async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    this.username = this.$store.getters.getUser.PrimaryEmail
    this.oldBio = this.$store.getters.getUser.Bio
    this.oldBudget = this.$store.getters.getUser.Budget
    this.oldLocation = this.$store.getters.getUser.Location
    this.oldDate = this.$store.getters.getUser.MoveDate

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
                    PrimaryEmail: this.username
                }
                const response = await AuthService.settings(info)
                this.msg = response.msg
            } catch(error){
                this.msg = error.response.data.msg
            }
        },
        async lifestyle() {

            }
        }
    }
</script>