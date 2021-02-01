<template>
    <div>
      <div class="container">
          <div>
            <h3 class="title is-1">Hello {{ firstName }}</h3>
            <br>
            <p>BIO</p>
            <input class="input is-rounded is-info" type="text" rows="10" placeholder="Biography" v-model="newBio" />
            <br>
            
      <div class="field is-horizontal">
       <div class="field-label is-normal">
          <label class="label">Budget</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info" type="number" :placeholder="budget" v-model="budget" />
            </p>
          </div>
        </div>

        <div class="field-label is-normal">
          <label class="label">Move-in-Date</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info" type="date" :placeholder="movDate" v-model="movDate" />
            </p>
          </div>
         </div>
            
            
          
      </div>
      <br>
            <p>Course</p>
            <input class="input is-rounded is-info"  type="text" :placeholder="study" v-model="study" />
            <p v-if="msg">{{ msg }}</p>
         </div>
         <div id="compSettings" style="border-color: #3498db; width: 100%; border-style: solid; border-width: 3px; height 10%;">
           <h2 class="title is-3">Profile pic</h2>
           <h4>Profile picture and location are compulsory</h4>
            
            <div>
            <profile-pic>ç
            </div>
            <div>
              <file-upload>
            </div>
            <p>Location</p>
            <input class="input is-rounded is-info"  type="text" :placeholder="location" v-model="location" />
            <br>
        </div>
    </div>
        <div>
            <h2 class="title is-3">Set Lifestyle</h2>
            <p>Please select how often you like to drink alcohol</p>
            <input type="radio" id="0" value="1" v-model="drinkingVal">
            <label for="0">Not at all</label>
            <input type="radio" id="1" value="2" v-model="drinkingVal">
            <label for="1">Once a month</label>
            <input type="radio" id="2" value="3" v-model="drinkingVal">
            <label for="2">Once a fortnight</label>
            <input type="radio" id="3" value="4" v-model="drinkingVal">
            <label for="3">Once a week</label>
            <input type="radio" id="4" value="5" v-model="drinkingVal">
            <label for="4">Every day</label><br>

            <p>Would you describe yourself as a night owl?</p>
            <input type="radio" id="owlYes" value="1" v-model="nightOwl">
            <label for="owlYes">Yes</label>
            <input type="radio" id="owlNo" value="0" v-model="nightOwl">
            <label for="owlNo">No</label><br>

            <p>Would you describe yourself as an extrovert?</p >
            <input type="radio" id="extroYes" value="1" v-model="extro">
            <label for="owlYes">Yes</label>
            <input type="radio" id="extroNo" value="0" v-model="extro">
            <label for="owlNo">No</label><br>

            <p>How often do you smoke?</p>
            <input type="radio" id="smoke0" value="1" v-model="smoke">
            <label for="smoke0">Never</label>
            <input type="radio" id="smoke1" value="2" v-model="smoke">
            <label for="smoke1">Rarely/Socially</label>
            <input type="radio" id="smoke2" value="3" v-model="smoke">
            <label for="smoke2">Every Day</label><br>

            <p>Are you a vegetarian, vegan or neither?</p>
            <input type="radio" id="diet0" value="1" v-model="diet">
            <label for="diet0">Vegan</label>
            <input type="radio" id="diet1" value="2" v-model="diet">
            <label for="diet1">Vegetarian</label>
            <input type="radio" id="diet2" value="3" v-model="diet">
            <label for="diet2">Neither</label><br>
            <input type="button" @click="settings" value="Save Changes" />
        </div>

        <!-- <div class="control_wrapper">
            <h2>Choose your Interests</h2>
            <p>Sports</p>
            <ejs-dropdownlist id='sportsData' :dataSource='sportsData' v-model="sportsSelection"></ejs-dropdownlist>
            <p>Outdoor/Adventure</p>
            <ejs-dropdownlist id='oaData' :dataSource='oaData' v-model="outdoorSelection"></ejs-dropdownlist>
            <p>Indoor</p>
            <ejs-dropdownlist id='indoorData' :dataSource='indoorData' v-model="indoorSelection"></ejs-dropdownlist>
            <p>Music</p>
            <ejs-dropdownlist id='musicData' :dataSource='musicData' v-model="musicSelection"></ejs-dropdownlist>
            <br>
            <br>
            <input type="button" @click="dropdown" value="Save Interests" />
        </div> -->

        <!-- Multiselect DropDown menu -->
        <div class="" style="margin: 10% 25%">
          <h2>Choose your Interests</h2>
          <br />

          <div class="field-lable is-normal">
            <label class="label">Sports</label>
            </div>
           <div class="field">
            <p class="control is-expanded">
              <div class="select is-rounded is-info">
                <ejs-multiselect
              :dataSource='sportsData' :mode='boxMode' :placeholder='waterMark' v-model="sportsSelection">
                  </ejs-multiselect>
                    {{sports}}
                  
              </div>
            </p>
           </div>
           



            <ejs-multiselect
              :dataSource='sportsData' :mode='boxMode' :placeholder='waterMark' v-model="sportsSelection">
            </ejs-multiselect>
            <br />
            <ejs-multiselect
              :dataSource='oaData' :mode='boxMode' :placeholder='waterMark' v-model="outdoorSelection">
            </ejs-multiselect>
            <br />
            <ejs-multiselect
              :dataSource='indoorData' :mode='boxMode' :placeholder='waterMark' v-model="indoorSelection">
            </ejs-multiselect>
            <br />
            <ejs-multiselect
              :dataSource='musicData' :mode='boxMode' :placeholder='waterMark' v-model="musicSelection">
            </ejs-multiselect>
            <br />
            <input type="button" @click="dropdown" value="Save Interests" />
        </div>
        <div>
            
        </div>
    </div>

</template>
<script>
import AuthService from "@/services/AuthService.js";
import FileUpload from "@/components/FileUpload.vue";
import ProfilePic from "@/components/ProfilePic.vue";
import Vue from "vue"; // https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns"; // https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
Vue.use(DropDownListPlugin); // https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
// following are for multiple select DropDown Menu
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(MultiSelectPlugin);
export default Vue.extend({
  name: "UserSettings",
  components: {
    FileUpload,
    ProfilePic
  },
  data() {
    return {
      newBio: "",
      firstName: "",
      budget: "",
      location: "",
      movDate: "",
      PrimaryEmail: "",
      secretMessage: "",
      username: "",
      drinkingVal: "",
      nightOwl: "",
      extro: "",
      smoke: "",
      diet: "",
      study: "",
      // array used for dropdown menu, which is getting populated using foreach loop
      sportsData: [],
      oaData: [],
      indoorData: [],
      musicData: [],
      // array variables to populate sql queries respectively, used before foreach loop
      dataSports: [],
      dataOAData: [],
      dataIndoorData: [],
      dataMusicData: [],
      sportsSelection: [],
      outdoorSelection: [],
      indoorSelection: [],
      musicSelection: [],
      dropdownSelections: [],
      // following are for multiple select DropDown Menu. Hardcoded
      waterMark: "Available Options",
      defaultMode: "Default",
      boxMode: "Box",
      delimiterMode: "Delimiter"
    };
  },

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
    this.username = this.$store.getters.getUser.PrimaryEmail;
    this.firstName = this.$store.getters.getUser.FirstName;
    const details = await AuthService.getDetails();
    this.newBio = details.bio;
    this.budget = details.budget;
    this.location = details.location;
    try {
      this.movDate = details.movDate.substring(0, 10);
    }
    catch (err) {
      this.movDate = ''
    }
    this.drinkingVal = details.drinking;
    this.nightOwl = details.owl;
    this.extro = details.extro;
    this.smoke = details.smoke;
    this.diet = details.diet;
    this.study = details.study;
    // retrieving and populating dropDown menu in Settings page
    this.dataSports = await AuthService.retrieveSportsData();
    this.dataSports.msg.forEach((element) =>
      this.sportsData.push(element.Interest)
    );
    this.dataOAData = await AuthService.retrieveOaData();
    this.dataOAData.msg.forEach((element) =>
      this.oaData.push(element.Interest)
    );
    this.dataIndoorData = await AuthService.retrieveIndoorData();
    this.dataIndoorData.msg.forEach((element) =>
      this.indoorData.push(element.Interest)
    );
    this.dataMusicData = await AuthService.retrieveMusicData();
    this.dataMusicData.msg.forEach((element) =>
      this.musicData.push(element.Interest)
    );

    this.secretMessage = await AuthService.getSecretContent();
  },

  methods: {
    async settings() {
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
          study: this.study,
        };
        const response = await AuthService.settings(info);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    async dropdown() {
      try {
        const info = {
          sportsSelection: this.sportsSelection,
          outdoorSelection: this.outdoorSelection,
          indoorSelection: this.indoorSelection,
          musicSelection: this.musicSelection,
          username: this.username,
        };
        const response = await AuthService.dropdown(info);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
});
</script>

// without this styling multiple dropdown doesnt work properly
<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>