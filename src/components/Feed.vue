<template>
  <div class="outer-boundary">
    <div id="container" v-if="arraylength==0">
      <div id="container">
        <i class="fas fa-users title is-1"></i>
      </div>
      <p class="subtitle is-6 left-align">Your feed is empty, check back later</p>
    </div>

    <div ref="container" id="container" v-show="arraylength !=0"></div> <!--Feed items will be injected-->

    <div class="box" id="controls">
      <div class="level is-mobile">
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
      page: 0,
      pageSize: 20,
    };
  },
  async created() {
    const credentials = {page: this.page};
    const result = await AuthService.getFeed(credentials);
    this.res = result;
    this.next();
  },
  methods: {
    async next() {
      if (this.currentSuggestion == this.pageSize * (this.page +1)) {
        this.page ++;
        const credentials = {page: this.page};
        const result = await AuthService.getFeed(credentials);
        this.res.push(result);
      }
      this.currentSuggestion = this.currentSuggestion + 1;
      this.change();
    },
    prev() {
      this.currentSuggestion = this.currentSuggestion - 1;
      this.change();
    },
    change() {
      if (this.res.length == 0) {
        return;
      } else {
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
      }
    },
    changer() {
      // case when match is performed "inside of middle" of an array and there are more feed
      if (this.arraylength > (this.currentSuggestion+1)) {
        this.change();
        // case when match is done at the end of an array
      } else if ((this.arraylength == (this.currentSuggestion+1)) && (this.arraylength > 1)) {
        this.currentSuggestion = this.currentSuggestion - 1;
        this.change();
      } else if (this.arraylength == 1) {
        this.arraylength = 0;
        this.change();
      } else {
        console.log('Error in feed');
      }
    },
    async match() {
      try {
        const currentReq = this.res[this.currentSuggestion];
        this.requestSentToName = currentReq.name;
        this.res.splice(this.currentSuggestion, 1);
        const credentials = {
          matchingId: this.matchID,
        };
        try {
          this.changer();
        } catch (error) {
          console.log(error);
        }
        const response = await AuthService.requestMatch(credentials);
        this.matchMessage = response.msg;
        if (response.msg.startsWith('Matched with')) {
          const latestMatchData = {
            name: currentReq.name,
            age: currentReq.age,
            matchingID: this.matchID,
            photo: currentReq.photo,
          };
          this.$emit('newMatch', latestMatchData);
        }
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    async reject() {
      try {
        this.res.splice(this.currentSuggestion, 1);
        const credentials = {
          matchingId: this.matchID,
        };
        try {
          this.changer();
        } catch (error) {
          console.log(error);
        }
        const response = await AuthService.reject(credentials);
        this.matchMessage = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
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
.outer-boundary{
  display: contents;
  flex-grow: 1;
}
.level{
  width: 100%;
}
#container{
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  overflow-y: auto;
  flex-shrink: 1;
  flex-grow: inherit;
  position: relative;
}
#controls {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.icon.is-huge{
  font-size: 8rem;
}

</style>
