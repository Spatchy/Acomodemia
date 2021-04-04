<template>
    <div ref="matchedlist">
        <div id="no-matches-info" v-if="matchesList.length==0">
            <div class="icon">
              <i class="fas fa-users title is-1"></i>
            </div>
            <p class="subtitle is-6 left-align">You don't have any matches yet, use the feed to find some</p>
          </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import MatchedPerson from '@/components/MatchedPerson.vue';
import Vue from 'vue';
export default {
  name: 'Matches',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MatchedPerson,
  },
  data() {
    return {
      matchesList: [],
      mostRecentMatchTime: '',
    };
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
          currentlyChatting: this.$route.query.to == match.matchingID,
        },
      });
      this.mostRecentMatchTime = match.timestamp;
      instance.$mount(); // pass nothing
      this.$refs.matchedlist.prepend(instance.$el);
    },
  },
  async created() {
    this.matchesList = await AuthService.getMatches();
    this.matchesList.forEach((element) => {
      this.displayMatches(element);
    });
    setInterval(async (outerThis) => {
      const newMatches = await AuthService.getNewMatchesByTimestamp({timestamp: outerThis.mostRecentMatchTime});
      newMatches.forEach(async (id) => {
        const match = await AuthService.getMatchByID({matchingID: id});
        outerThis.displayMatches(match);
      });
    }, 30000, this);
  },
};
</script>
