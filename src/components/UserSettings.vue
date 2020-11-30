<template>
    <div>
        <div>
            <h3>Hi {{ username }}</h3>
            <input type="text" :placeholder="oldBio" v-model="newBio" />
            <input type="number" :placeholder="oldBudget" v-model="budget" />
            <input type="text" :placeholder="oldLocation" v-model="location" />
            <input type="date" :placeholder="oldDate" v-model="movDate" />
            <input type="text" :placeholder="oldStudy" v-model="study" />
            <input type="button" @click="settings" value="Submit" />
            <p v-if="msg">{{ msg }}</p>
        </div>
        <div>
            <h2>Set Lifestyle</h2>
            <p>Please select how often you like to drink alcohol</p>
            <input type="radio" id="0" value="0" v-model="drinkingVal"> 
            <label for="0">Not at all</label>
            <input type="radio" id="1" value="1" v-model="drinkingVal">
            <label for="1">Once a month</label>
            <input type="radio" id="2" value="2" v-model="drinkingVal">
            <label for="2">Once a fortnight</label>
            <input type="radio" id="3" value="3" v-model="drinkingVal">
            <label for="3">Once a week</label>
            <input type="radio" id="4" value="4" v-model="drinkingVal">
            <label for="4">Every day</label><br>

            <p>Would you describe yourself as a night owl?</p>
            <input type="radio" id="owlYes" value="1" v-model="nightOwl">
            <label for="owlYes">Yes</label>
            <input type="radio" id="owlNo" value="0" v-model="nightOwl">
            <label for="owlNo">No</label><br>

            <p>Would you describe yourself as an extrovert?</p>
            <input type="radio" id="extroYes" value="1" v-model="extro">
            <label for="owlYes">Yes</label>
            <input type="radio" id="extroNo" value="0" v-model="extro">
            <label for="owlNo">No</label><br>

            <p>How often do you smoke?</p>
            <input type="radio" id="smoke0" value="0" v-model="smoke">
            <label for="smoke0">Never</label>
            <input type="radio" id="smoke1" value="1" v-model="smoke">
            <label for="smoke1">Rarely/Socially</label>
            <input type="radio" id="smoke2" value="2" v-model="smoke">
            <label for="smoke2">Every Day</label><br>

            <p>Are you a vegetarian, vegan or neither?</p>
            <input type="radio" id="diet0" value="0" v-model="diet">
            <label for="diet0">Vegan</label>
            <input type="radio" id="diet1" value="1" v-model="diet">
            <label for="diet1">Vegetarian</label>
            <input type="radio" id="diet2" value="2" v-model="diet">
            <label for="diet2">Neither</label><br>

            <input type="button" @click="lifestyle" value="Set Lifestyle" />

        </div>
    </div>
    
</template>
<script>
import AuthService from '@/services/AuthService.js'
export default {
    name: "UserSettings",
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
            drinkingVal: '',
            oldDrink: '',
            nightOwl: '',
            oldOwl: '',
            extro: '',
            oldExtro: '',
            smoke: '',
            oldSmoke: '',
            diet: '',
            oldDiet: '',
            study: '',
            oldStudy: ''

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
    this.oldDate = this.$store.getters.getUser.MoveDate.substring(0, 10)
    this.oldDrink = this.$store.getters.getUser.DrinkingLevel
    this.oldOwl = this.$store.getters.getUser.IsNightOwl
    this.oldExtro = this.$store.getters.getUser.IsExtrovert
    this.oldSmoke = this.$store.getters.getUser.SmokingLevel
    this.oldDiet = this.$store.getters.getUser.DietLevel
    this.oldStudy = this.$store.getters.getUser.StudySubject

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
                    PrimaryEmail: this.username,
                    drinkingVal: this.oldDrink,
                    nightOwl: this.oldOwl,
                    extro: this.oldExtro,
                    smoke: this.oldSmoke,
                    diet: this.oldDiet,
                    study: this.study
                }
                const response = await AuthService.settings(info)
                this.msg = response.msg
            } catch(error){
                this.msg = error.response.data.msg
            }
        },
        async lifestyle() {
            try {
                const info = {
                    newBio: this.oldBio,
                    budget: this.oldBudget,
                    location: this.oldLocation,
                    movDate: this.oldDate,
                    PrimaryEmail: this.username,
                    drinkingVal: this.drinkingVal,
                    nightOwl: this.nightOwl,
                    extro: this.extro,
                    smoke: this.smoke,
                    diet: this.diet,
                    study: this.oldStudy
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