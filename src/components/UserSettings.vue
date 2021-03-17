<template>
  <div :class="{'mobile-scrolling':$isMobile()}">
    <div class="box">
        <h1 class="title is-1">
          <div v-if="this.$route.path == '/complete'">
            Complete Your Profile
            <h6 class="subtitle is-6">You can change any of these settings at any time on your account page</h6>
          </div>
          <span v-else>Account Settings</span>
        </h1>
    </div>
    <div class="columns">
      <div class="column is-flex">

        <div class="box is-full-height">
          <h3 class="title is-3">Basic Settings</h3>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Location</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="text" placeholder="Town or city you want to live" v-model="location" v-on:keyup.enter="settings">
                  <p class="help is-danger">Location is compulsory</p>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Budget</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="number" placeholder="£ per person per month" v-model="budget" v-on:keyup.enter="settings">
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Move in Date</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="date" placeholder="dd/mm/yyyy" v-model="movDate" v-on:keyup.enter="settings">
                </div>
                <p class="has-text-danger" v-if="msgMoveIn">{{ msgMoveIn }}</p>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Course</label>
                <div class="control is-expanded">
                  <input class="input is-rounded is-primary" type="text" placeholder="What you're studying" v-model="study" v-on:keyup.enter="settings">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Bio</label>
            <div class="control is-expanded">
              <textarea class="textarea is-rounded is-primary" type="text" rows="6" placeholder="Tell people something about yourself" v-model="newBio"></textarea>
            </div>
          </div>

          <div class="column is-one-third is-offset-one-third">
            <input class=" button is-rounded is-primary" type="button" @click="settingsBasic" value="Save Changes">
            <p class="has-text-success" v-if="msgBasic && (msgMoveIn.length == 0)">{{ msgBasic }}</p>
          </div>


        </div>
      </div>

      <div class="column is-one-third is-flex">
        <div class="box is-full-height">
          <h3 class="title is-3">Profile Picture</h3>
          <div class="level">
            <div class="level-item">
              <div class="image is-300x300">
                <profile-pic ref="profilePic">
              </div>
            </div>
          </div>
          <hr>
          <div>
            <file-upload @fileReady="refreshImage" @successfulUpload="successfulUpload">
          </div>
          <p class="help is-danger">A profile picture is compulsory</p>
        </div>
      </div>

    </div>

    <div class="columns">
      <div class="column">
        <div class="box">
          <h3 class="title is-3">Lifestyle Choices</h3>

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
            <input class=" button is-rounded is-primary" type="button" @click="settingsLifestyleChoice" value="Save Changes">
            <p class="has-text-success" v-if="msgLifeStyleChoice">{{ msgLifeStyleChoice }}</p>
          </div>
        </div>

        <div class="box">

          <h3 class="title is-3">Choose your Interests</h3>

          <div class="field">
            <label class="label">Sports</label>
            <div class="control is-expanded">
              <div class="input is-primary is-rounded multiselect-wrapper has-icons-right">
                <ejs-multiselect
                  :dataSource='sportsData' mode='Box' placeholder='Sports' v-model="sportsSelection">
                </ejs-multiselect>
                <span class="icon is-small is-right">
                  <i class="fas fa-angle-down"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Outdoor and Adventure Activities</label>
            <div class="control is-expanded">
              <div class="input is-primary is-rounded multiselect-wrapper has-icons-right">
                <ejs-multiselect
                  :dataSource='oaData' mode='Box' placeholder='Outdoor Activities' v-model="outdoorSelection">
                </ejs-multiselect>
                <span class="icon is-small is-right">
                  <i class="fas fa-angle-down"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Indoor Activities</label>
            <div class="control is-expanded">
              <div class="input is-primary is-rounded multiselect-wrapper has-icons-right">
                <ejs-multiselect
                  :dataSource='indoorData' mode='Box' placeholder='Indoor Activities' v-model="indoorSelection">
                </ejs-multiselect>
                <span class="icon is-small is-right">
                  <i class="fas fa-angle-down"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Music Genres</label>
            <div class="control is-expanded">
              <div class="input is-primary is-rounded multiselect-wrapper has-icons-right">
                <ejs-multiselect
                  :dataSource='musicData' mode='Box' placeholder='Music' v-model="musicSelection">
                </ejs-multiselect>
                <span class="icon is-small is-right">
                  <i class="fas fa-angle-down"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="column is-one-third is-offset-one-third">
            <div class="field">
              <div class="control is-expanded">
                <button class="button is-primary is-rounded" @click="dropdown">Save Interests</button>
                <p class="has-text-success" v-if="msgInterests">{{ msgInterests }}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="column is-one-third">
        <div class="box" ref="changeemail" v-if="this.$route.path != '/complete'">
          <h3 class="title is-3">Change Email</h3>
          <change-email>
        </div>
        <div class="box" v-else>
          <h3 class="title is-3">Are You Done?</h3>
          <div class="field">
            <p>When you're happy with your profile, you can go to your feed to start finding matches</p>
            <div class="control is-expanded">
              <button class="button is-primary is-rounded" @click="$router.push('/feed')">Go to feed</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <button class="button is-rounded is-danger" @click="deleteAccount">Delete Account</button>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import FileUpload from '@/components/FileUpload.vue';
import ProfilePic from '@/components/ProfilePic.vue';
import ChangeEmail from '@/components/ChangeEmail.vue';
import Vue from 'vue';
// https://ej2.syncfusion.com/vue/documentation/drop-down-list/getting-started/
import {DropDownListPlugin} from '@syncfusion/ej2-vue-dropdowns';
Vue.use(DropDownListPlugin);
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
      msgMoveIn: '',
      msgBasic: '',
      msgInterests: '',
      msgLifeStyleChoice: '',
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
    // retrieving and populating interests dropDown
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
    // retrieving user's already selected interests
    const allInterests = await AuthService.getInterests();
    allInterests.forEach((element) => {
      if (element.Category == 'Sports') {
        this.sportsSelection.push(element.Interest);
      } else if (element.Category == 'Indoor') {
        this.indoorSelection.push(element.Interest);
      } else if (element.Category == 'Outdoor/Adventure') {
        this.outdoorSelection.push(element.Interest);
      } else if (element.Category == 'Music') {
        this.musicSelection.push(element.Interest);
      }
    });
  },
  methods: {
    async settingsBasic() {
      try {
        this.msgMoveIn = '';
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
        const response = await AuthService.settings(info);
        this.msg = response.msg;
      } catch (error) {
        this.msgMoveIn = error.response.data.msg;
      }
      this.msgBasic = 'Saved';
    },
    async settingsLifestyleChoice() {
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
        this.msgLifeStyleChoice = 'Saved';
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
        this.msgInterests = 'Saved';
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    async refreshImage(file) {
      this.$refs.profilePic.refreshImage(file); // pass data to profilePic component when an image is ready
    },
    async successfulUpload() {
      this.$refs.profilePic.successfulUpload();
    },
    async deleteAccount() {
      if (confirm('Warning! this will permanently delete your account and cannot be undone! click ok to confirm!')) {
        try {
          const response = await AuthService.deleteAccount();
          this.msg = response.msg;
        } catch (error) {
          console.error(error);
        }
        this.$router.push('/logout');
      }
    },
  },
});
</script>

<style scoped>
/* without this styling multiple dropdown doesnt work properly */
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";


.image{
  overflow: hidden;
}

.box{
  margin: 0.25rem;
}

.box.is-full-height{
  height: 100%;
}

.control.is-radio-left{
  text-align: left;
}

.mobile-scrolling {
  overflow-y: scroll;
  height: 100%;
}
</style>
