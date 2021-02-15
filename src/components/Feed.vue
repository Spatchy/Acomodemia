<template>

    <div>
      <div id="empty-feed-info" v-if="arraylength==0">
        <div class="icon">
          <i class="fas fa-users title is-1"></i>
        </div>
        <p class="subtitle is-6 left-align">Your feed is empty, check back later</p>
      </div>
      <div ref="container" id="container"></div> <!--Feed items will be injected-->
      <div id="controls">
        <div class="level">
          <div class="level-item has-text-centred">
            <button class="button is-rounded is-primary" value="Previous" ref="prevBtn" :disabled="arraylength==0 || currentSuggestion==0" @click="prev">
              <span class="icon title is-1 has-text-white"><i class="fas fa-chevron-left"></i></span>
            </button>
          </div>
          <div class="level-item has-text-centred">
            <button class="button is-rounded is-primary" value="Hide" ref="rejBtn" :disabled="arraylength==0" @click="reject">
              <span class="icon title is-1 has-text-white"><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="level-item has-text-centred">
            <button class="button is-rounded is-primary" value="Match" ref="matchBtn" :disabled="arraylength==0" @click="match">
              <span class="icon title is-1 has-text-white"><i class="fas fa-check"></i></span>
            </button>
          </div>
          <div class="level-item has-text-centred">
            <button class="button is-rounded is-primary" value="Next" ref="nextBtn" :disabled="arraylength==0 || currentSuggestion==(arraylength-1)" @click="next">
              <span class="icon title is-1 has-text-white"><i class="fas fa-chevron-right"></i></span>
            </button>
          </div>
        </div>
      </div>
      <div :class="['modal', {'is-active':matchMessage.startsWith('Matched with')}]">
        <div class="modal-background" @click="clearMatchMessage()"></div>
        <div class="modal-content">
          <div class="box">
            <h2 class="title is-2">You Got a Match!</h2>
            <div class="section">
              <span class="icon is-huge has-text-primary">
                <i class="fas fa-handshake"></i>
              </span>
              <p>You matched with {{ requestSentToName }}! Why not say hi?</p>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <div class="control is-expended">
                    <button class="button is-primary is-rounded" @click="pushToChat()">
                      Go to Chat
                    </button>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="control is-expanded">
                    <button class="button is-rounded is-light" @click="clearMatchMessage()">
                      Keep Browsing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close"  @click="clearMatchMessage()"></button>
      </div>
   </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import FeedItem from '@/components/FeedItem.vue';
import Vue from 'vue';
export default {
  name: 'Feed',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FeedItem,
  },
  data() {
    return {
      name: '',
      age: '',
      gender: '',
      location: '',
      budget: '',
      interests: [],
      drinking: '',
      smoking: '',
      diet: '',
      sleep: '',
      social: '',
      subject: '',
      bio: '',
      matchID: '',
      currentSuggestion: -1,
      res: [],
      matchMessage: '',
      profilePic: '',
      arraylength: 0,
      requestSentToName: '',
    };
  },
  async created() {
    const credentials = {page: 0};
    const result = await AuthService.getFeed(credentials);
    this.res = result;
    this.next();
  },
  methods: {
    next() {
      this.currentSuggestion = this.currentSuggestion + 1;
      this.change();
    },
    prev() {
      this.currentSuggestion = this.currentSuggestion - 1;
      this.change();
    },
    change() {
      this.$refs.container.innerHTML = '';
      this.matchID = this.res[this.currentSuggestion].matchingId;

      this.arraylength = this.res.length;

      const ComponentClass = Vue.extend(FeedItem);
      const instance = new ComponentClass({
        propsData: {
          name: this.res[this.currentSuggestion].name,
          age: this.res[this.currentSuggestion].age,
          gender: this.res[this.currentSuggestion].gender,
          location: this.res[this.currentSuggestion].location,
          budget: this.res[this.currentSuggestion].budget,
          subject: this.res[this.currentSuggestion].subject,
          bio: this.res[this.currentSuggestion].bio,
          drinking: this.drinking = this.res[this.currentSuggestion].drinking,
          smoking: this.res[this.currentSuggestion].smoking,
          diet: this.res[this.currentSuggestion].diet,
          sleep: this.res[this.currentSuggestion].sleep,
          social: this.res[this.currentSuggestion].social,
          interests: this.res[this.currentSuggestion].interests,
          profilePic: this.res[this.currentSuggestion].photo,
        },
      });
      instance.$mount(); // pass nothing
      this.$refs.container.appendChild(instance.$el);
    },
    async match() {
      try {
        this.requestSentToName = this.res[this.currentSuggestion].name;
        this.res.splice(this.currentSuggestion, 1);
        const credentials = {
          matchingId: this.matchID,
        };
        try {
          this.next();
        } catch (error) {
          console.log(error);
        }
        const response = await AuthService.requestMatch(credentials);
        this.matchMessage = response.msg;
      } catch (error) {
        this.matchMessage = error.response.data.msg;
      }
    },
    async reject() {
      try {
        this.res.splice(this.currentSuggestion, 1);
        this.res[this.currentSuggestion];
        const credentials = {
          matchingId: this.matchID,
        };
        this.next();
        const response = await AuthService.reject(credentials);
        this.matchMessage = response.msg;
      } catch (error) {
        this.matchMessage = error.response.data.msg;
      }
    },
    async clearMatchMessage() {
      this.matchMessage = '';
    },
    async pushToChat() {
      this.$router.push('/chat?to='+this.matchMessage.split(' ')[2]);
    },
  },
};
</script>
<style scoped>
button{
  width: 100%;
  height: 100%;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.level{
  position: absolute;
  bottom: 0.25rem;
  left: calc(25% - 0.5rem);
  right: 0px;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
#container{
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.icon.is-huge{
  font-size: 10rem;
}
</style>
