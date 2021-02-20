<template>
  <div>
    <div class="columns">
      <div class="column">

        <div class="box">
          <h3 class="title is-3">Basic Settings</h3>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Location</label>
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
            <label class="label">Bio</label>
            <div class="control is-expanded">
              <textarea class="textarea is-rounded is-primary" type="text" rows="6" placeholder="Tell people something about yourself" v-model="newBio" />
            </div>
          </div>

          <div class="column is-one-third is-offset-one-third">
            <input class=" button is-rounded is-primary" type="button" @click="settings" value="Save Changes">
          </div>

        </div>

        <div class="box">
          <h2 class="title is-3">Lifestyle Choices</h2>

          <div class="field">
            <label class="label">How often do you drink alcohol?</label>
            <div class="control is-radio-left">
              <label class="radio">
                <input type="radio" name="al-ans" value="1" v-model="drinkingVal">
                Not At All
              </label>
              <label class="radio">
                <input type="radio" name="al-ans" value="2" v-model="drinkingVal">
                Occasionally
              </label>
              <label class="radio">
                <input type="radio" name="al-ans" value="3" v-model="drinkingVal">
                Somewhat frequently
              </label>
              <label class="radio">
                <input type="radio" name="al-ans" value="4" v-model="drinkingVal">
                Frequently
              </label>
              <label class="radio">
                <input type="radio" name="al-ans" value="5" v-model="drinkingVal">
                Very Frequently
              </label>
              <label class="radio">
                <button class="delete" @click="drinkingVal=0"></button>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Which of these best describes your sleep habits?</label>
            <div class="control is-radio-left">
              <label class="radio">
                <input type="radio" name="ni-ans" value="1" v-model="nightOwl">
                Night Owl
              </label>
              <label class="radio">
                <input type="radio" name="ni-ans" value="2" v-model="nightOwl">
                Flexible
              </label>
              <label class="radio">
                <input type="radio" name="ni-ans" value="3" v-model="nightOwl">
                Morning Lark
              </label>
              <label class="radio">
                <button class="delete" @click="nightOwl=0"></button>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Which of these best describes you?</label>
            <div class="control is-radio-left">
              <label class="radio">
                <input type="radio" name="ex-ans" value="1" v-model="extro">
                Extrovert
              </label>
              <label class="radio">
                <input type="radio" name="ex-ans" value="2" v-model="extro">
                Introvert
              </label>
              <label class="radio">
                <button class="delete" @click="extro=0"></button>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">How often do you smoke?</label>
            <div class="control is-radio-left">
              <label class="radio">
                <input type="radio" name="sm-ans" value="1" v-model="smoke">
                Not At All
              </label>
              <label class="radio">
                <input type="radio" name="sm-ans" value="2" v-model="smoke">
                Rarley/Socially
              </label>
              <label class="radio">
                <input type="radio" name="sm-ans" value="3" v-model="smoke">
                Often
              </label>
              <label class="radio">
                <button class="delete" @click="smoke=0"></button>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Do you follow any of these dietary plans?</label>
            <div class="control is-radio-left">
              <label class="radio">
                <input type="radio" name="ve-ans" value="1" v-model="diet">
                Vegetarian
              </label>
              <label class="radio">
                <input type="radio" name="ve-ans" value="2" v-model="diet">
                Vegan
              </label>
              <label class="radio">
                <input type="radio" name="ve-ans" value="3" v-model="diet">
                Neither
              </label>
              <label class="radio">
                <button class="delete" @click="diet=0"></button>
              </label>
            </div>
          </div>

          <div class="column is-one-third is-offset-one-third">
            <input class=" button is-rounded is-primary" type="button" @click="settings" value="Save Changes">
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
      firstName: '',
      // variables for basic settings
      budget: '',
      location: '',
      movDate: '',
      study: '',
      newBio: '',
      // variables for lifestyle choices
      drinkingVal: 0,
      nightOwl: 0,
      extro: 0,
      smoke: 0,
      diet: 0,
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
    this.firstName = this.$store.getters.getUser.FirstName;
    const details = await AuthService.getDetails();
    this.newBio = details.bio;
    this.budget = details.budget;
    this.location = details.location;
    try {
      this.movDate = details.movDate.substring(0, 10);
    } catch (err) {
      this.movDate = null;
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
  },
  methods: {
    async settings() {
      try {
        const info = {
          newBio: this.newBio,
          budget: this.budget,
          location: this.location,
          movDate: this.movDate,
          study: this.study,
          drinkingVal: this.drinkingVal,
          nightOwl: this.nightOwl,
          extro: this.extro,
          smoke: this.smoke,
          diet: this.diet,
        };
        console.log(info);
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

.box{
  margin: 0.25rem;
}

.control.is-radio-left{
  text-align: left;
}

</style>
