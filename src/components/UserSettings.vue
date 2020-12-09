<template>
    <div>
        <div>
            <h3>Hi {{ username }}</h3>
            <br>
            <p>Bio</p>
            <input type="text" :placeholder="newBio" v-model="newBio" />
            <br>
            <p>Budget</p>
            <input type="number" :placeholder="budget" v-model="budget" />
            <br>
            <p>Location</p>
            <input type="text" :placeholder="location" v-model="location" />
            <br>
            <p>Move in Date</p>
            <input type="date" :placeholder="movDate" v-model="movDate" />
            <br>
            <p>Course</p>
            <input type="text" :placeholder="study" v-model="study" />
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
        </div>

        <div class="control_wrapper">
            <h2>Choose your Interests</h2>    
            <p>Sports</p>
            <ejs-dropdownlist id='sportsData' :dataSource='sportsData'></ejs-dropdownlist>
            <p>Outdoor/Adventure</p>
            <ejs-dropdownlist id='oaData' :dataSource='oaData'></ejs-dropdownlist>
            <p>Indoor</p>
            <ejs-dropdownlist id='indoorData' :dataSource='indoorData'></ejs-dropdownlist>
            <p>Music</p>
            <ejs-dropdownlist id='musicData' :dataSource='musicData'></ejs-dropdownlist>
            <br>
            <br>
            <input type="button" @click="settings" value="Save Changes" />
        </div>
        <div> 
            <file-upload> 
        </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import FileUpload from '@/components/FileUpload.vue'
import Vue from 'vue'; //https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns'; //https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
Vue.use(DropDownListPlugin); //https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
export default Vue.extend ({
    name: "UserSettings",
    components: {
       FileUpload 
    },
    data() {
        return{
            newBio: '',
            budget: '',
            location: '',
            movDate: '',
            PrimaryEmail: '',
            secretMessage: '',
            username: '',
            drinkingVal: '',
            nightOwl: '',
            extro: '',
            smoke: '',
            diet: '',
            study: '',
            // array used for dropdown menu, which is getting populated using foreach loop
            sportsData: [],
            oaData: [],
            indoorData: [],
            musicData: [],
            // array variables to populate sql queries respectively, used before foreach loop
            dataSports: [],
            dataOAData: [],
            dataIndoorData: [],
            dataMusicData: []
        }
    },

    async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    this.username = this.$store.getters.getUser.PrimaryEmail
    this.newBio = this.$store.getters.getUser.Bio
    this.budget = this.$store.getters.getUser.Budget
    this.location = this.$store.getters.getUser.Location
    this.movDate = this.$store.getters.getUser.MoveDate.substring(0, 10)
    this.drinkingVal = this.$store.getters.getUser.DrinkingLevel
    this.nightOwl = this.$store.getters.getUser.IsNightOwl
    this.extro = this.$store.getters.getUser.IsExtrovert
    this.smoke = this.$store.getters.getUser.SmokingLevel
    this.diet = this.$store.getters.getUser.DietLevel
    this.study = this.$store.getters.getUser.StudySubject
    // retrieving and populating dropDown menu in Settings page
    this.dataSports = await AuthService.retrieveSportsData();
    this.dataSports.msg.forEach(element => this.sportsData.push(element['Interest']));
    this.dataOAData = await AuthService.retrieveOaData();
    this.dataOAData.msg.forEach(element => this.oaData.push(element['Interest']));
    this.dataIndoorData = await AuthService.retrieveIndoorData();
    this.dataIndoorData.msg.forEach(element => this.indoorData.push(element['Interest']));
    this.dataMusicData = await AuthService.retrieveMusicData();
    this.dataMusicData.msg.forEach(element => this.musicData.push(element['Interest']));
    
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
                    drinkingVal: this.drinkingVal,
                    nightOwl: this.nightOwl,
                    extro: this.extro,
                    smoke: this.smoke,
                    diet: this.diet,
                    study: this.study
                }
                const response = await AuthService.settings(info)
                this.msg = response.msg
            } catch(error){
                this.msg = error.response.data.msg
            }
        },
        }
    });
</script>

