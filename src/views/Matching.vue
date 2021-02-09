<template>
    <div>
      <div class="columns">
        <div class="column is-one-quarter" ref="matchedlist" id="matchedList">
          <div class="box">
            <h2 class="title is-2">Your Matches</h2>
          </div>
        </div> <!--matches will be injected-->
        <div class="column">
            <div class="box">
              <h2 class="title is-2">Feed</h2>
            </div>
            <feed>
        </div>
      </div>
    </div>
</template>
<script>
import Feed from '@/components/Feed.vue';
import AuthService from '@/services/AuthService.js';
import MatchedPerson from '@/components/MatchedPerson.vue';
import Vue from 'vue';

export default {
  name: 'Matching',
  data() {
    return {
      matchesList: [],
    };
  },
  components: {
    Feed,
    // eslint-disable-next-line vue/no-unused-components
    MatchedPerson,
  },
  methods: {
    displayMatches(match) {
      const ComponentClass = Vue.extend(MatchedPerson);
      const instance = new ComponentClass({
        propsData: {
          name: match.name,
          age: match.age,
          matchingID: match.matchingID,
          photo: match.photo,
        },
      });
      instance.$mount(); // pass nothing
      this.$refs.matchedlist.appendChild(instance.$el);
    },
  },
  async mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    if (!this.$store.getters.isVerified) {
      this.$router.push('/verify'); // redirect user to verify if not verified
    }
    if (!this.$store.getters.getUser.EssentialSettingsComplete) {
      this.$router.push('/Complete'); // redirect user to complete their essential settings
    }
  },
  async created() {
    this.matchesList = await AuthService.getMatches();
    this.matchesList.forEach((element) => {
      this.displayMatches(element);
      console.log(element.matchingID);
    });
  },
};
</script>
<style scoped>
.box{
  margin: 0.25rem;
}
#matchedList{
  overflow-y: scroll;
  height: calc(100vh - 68px)
}
</style>
