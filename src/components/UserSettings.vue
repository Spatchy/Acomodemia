<template>
  <div>
    <div class="columns">
      <div class="column">

        <div class="box">
          <h3 class="title is-3">Basic Settings</h3>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Location you're looking for housemates</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="text" :placeholder="Location" v-model="location" />
                  <p class="help is-danger">Location is compulsory</p>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Budget</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="number" :placeholder="budget" v-model="budget" />
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Move in Date</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="date" :placeholder="movDate" v-model="movDate" />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Course</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="text" :placeholder="Course" v-model="course" />
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label align-centre">Bio</label>
            <div class="control is-expanded">
              <textarea class="textarea is-rounded is-primary" type="text" rows="6" placeholder="Tell people something about yourself" v-model="newBio" />
            </div>
          </div>
        </div>

      </div>

      <div class="column is-one-third">
        <div class="box">
          <h3 class="title is-3">Profile Picture</h3>
          <div class="level">
            <div class="level-item">
              <div class="image is-300x300">
                <profile-pic>
              </div>
            </div>
          </div>
          <hr>
          <div>
            <file-upload>
          </div>
          <p class="help is-danger">A profile pic is compulsory</p>
        </div>
      </div>

    </div>


    <div>
          <div>
            <h2 class="title is-3">Set Lifestyle</h2>

              <h5>How often do you like to drink alcohol ?</h5>
            <div class="control">

              <label class="radio1">
                <input type="radio" name="al-ans">Not At All</label>
              <label class="radio">
                <input type="radio" name="al-ans">Once a month </label>
              <label class="radio" >
                <input type="radio" name="al-ans" >Once a fortnight </label>
              <label class="radio" >
                <input type="radio" name="al-ans" >Once a week </label>
              <label class="radio" >
                <input type="radio" name="al-ans" >Everyday</label>

            </div>
            <br>

              <h5>Would you desribe yourself as a night owl?</h5>
              <div class="control">

              <label class="radio2">
                <input type="radio" name="ni-ans">Yes</label>
              <label class="radio">
                <input type="radio" name="ni-ans">Sometimes </label>
              <label class="radio" >
                <input type="radio" name="ni-ans" >No </label>

            </div>
            <br>

              <h5>Would you desribe yourself as an extrovert?</h5>
            <div class="control">

              <label class="radio3">
                <input type="radio" name="ex-ans">Yes</label>
              <label class="radio" >
                <input type="radio" name="ex-ans" >No </label>
            </div>
            <br>

            <h5>How often do you smoke ?</h5>
            <div class="control">

              <label class="radio4">
                <input type="radio" name="sm-ans">Not At All</label>
              <label class="radio">
                <input type="radio" name="sm-ans">Rarley/ Socially</label>
              <label class="radio" >
                <input type="radio" name="sm-ans" >Often</label>
            </div>
            <br>

              <h5>Are you vegetarian, vegan or neither?</h5>
            <div class="control">

              <label class="radio5">
                <input type="radio" name="ve-ans">Vegetarian</label>
              <label class="radio">
                <input type="radio" name="ve-ans">Vegan</label>
              <label class="radio" >
                <input type="radio" name="ve-ans" >Neither </label>
            </div>
            <br>
            <div class="column is-three-fifths is-offset-one-fifth">
              <input class=" button is-rounded is-primary" type="button" @click="settings" value="Save Changes" />
            </div>
          </div>
          <br>

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
      </div>-->

      <!-- Multiselect DropDown menu -->

        <div class="" style="margin: 10% 25%">
          <h2 class="title is-3">Choose your Interests</h2>
          <br />
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
        <br>

      <div ref="changeemail">
        <change-email>
      </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import FileUpload from '@/components/FileUpload.vue';
import ProfilePic from '@/components/ProfilePic.vue';
import ChangeEmail from '@/components/ChangeEmail.vue';
import Vue from 'vue'; // https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
import {DropDownListPlugin} from '@syncfusion/ej2-vue-dropdowns'; // https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
Vue.use(DropDownListPlugin); // https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
// following are for multiple select DropDown Menu
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns';
Vue.use(MultiSelectPlugin);
export default Vue.extend({
  name: 'UserSettings',
  components: {
    FileUpload,
    ProfilePic,
    ChangeEmail,
  },
  data() {
    return {
      newBio: '',
      firstName: '',
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
      dataMusicData: [],
      sportsSelection: [],
      outdoorSelection: [],
      indoorSelection: [],
      musicSelection: [],
      dropdownSelections: [],
      // following are for multiple select DropDown Menu. Hardcoded
      waterMark: 'Available Options',
      defaultMode: 'Default',
      boxMode: 'Box',
      delimiterMode: 'Delimiter',
    };
  },

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    this.username = this.$store.getters.getUser.PrimaryEmail;
    this.firstName = this.$store.getters.getUser.FirstName;
    const details = await AuthService.getDetails();
    this.newBio = details.bio;
    this.budget = details.budget;
    this.location = details.location;
    try {
      this.movDate = details.movDate.substring(0, 10);
    } catch (err) {
      this.movDate = '';
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
      this.sportsData.push(element.Interest),
    );
    this.dataOAData = await AuthService.retrieveOaData();
    this.dataOAData.msg.forEach((element) =>
      this.oaData.push(element.Interest),
    );
    this.dataIndoorData = await AuthService.retrieveIndoorData();
    this.dataIndoorData.msg.forEach((element) =>
      this.indoorData.push(element.Interest),
    );
    this.dataMusicData = await AuthService.retrieveMusicData();
    this.dataMusicData.msg.forEach((element) =>
      this.musicData.push(element.Interest),
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
<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);

.image{
  overflow: hidden;
}

</style>
