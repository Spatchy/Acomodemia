<template>
    <div class="outer-boundary">
      <div class="columns">
        <div class="column is-one-quarter" id="matchedList" v-if="!$isMobile()">
          <div class="box">
            <h2 class="title is-2">Your Matches</h2>
          </div>
          <matches>
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
import Matches from '@/components/Matches.vue';

export default {
  name: 'Matching',
  components: {
    Feed,
    // eslint-disable-next-line vue/no-unused-components
    Matches,
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
};
</script>
<style scoped>
.outer-boundary{
  height: calc(100vh - 68px);
}
.box{
  margin: 0.25rem;
}
.columns{
  height: 100%;
}
.column{
  display: flex;
  flex-direction: column;
}
#matchedList{
  overflow-y: scroll;
  height: calc(100vh - 68px)
}
#no-matches-info{
  margin: 0.25rem;
}
</style>
