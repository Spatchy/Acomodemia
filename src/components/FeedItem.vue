<template>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-300x300" id="photo">
              <img :src="getPic()" alt="">
            </figure>
          </div>
          <div class="media-content">
            <div>
              <h3 class="title is-3 left-align">{{name}}, {{age}}</h3>
              <h5 class="subtitle is-5 left-align has-bottom-divider">{{gender}}</h5>
            </div>
            <div class="tags has-addons left-align">
              <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-map-marker-alt"></i></span></div>
              <div class="tag is-rounded"><span>{{location}}</span></div>
            </div>
            <div class="tags has-addons left-align">
              <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-money-bill-alt"></i></span></div>
              <div class="tag is-rounded"><span>£{{budget}} pppm</span></div>
            </div>
            <div class="tags has-addons left-align">
              <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-user-graduate"></i></span></div>
              <div class="tag is-rounded"><span>{{subject}}</span></div>
            </div>
            <h5 class="subtitle is-5 left-align segment-title">{{name}}'s Interests</h5>
            <div ref="interestcontainer" class="left-align" ></div> <!--Interests tags will be injected-->
            <h5 class="subtitle is-5 left-align segment-title">{{name}}'s Lifestyle</h5>
            <div class="field is-grouped is-grouped-multiline left-align">
              <div class="control">
                <span class="tags has-addons" v-if="drinking>0">
                  <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-wine-glass-alt"></i></span></div>
                  <div class="tag is-rounded"><span>{{drinkingMap[drinking]}}</span></div>
                </span>
              </div>
              <div class="control">
                <span class="tags has-addons has-end-buffer" v-if="smoking>0">
                  <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-smoking"></i></span></div>
                  <div class="tag is-rounded"><span>{{smokingMap[smoking]}}</span></div>
                </span>
              </div>
              <div class="control">
                <span class="tags has-addons has-end-buffer" v-if="diet>0">
                  <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-utensils"></i></span></div>
                  <div class="tag is-rounded"><span>{{dietMap[diet]}}</span></div>
                </span>
              </div>
              <div class="control">
                <span class="tags has-addons has-end-buffer" v-if="sleep>0">
                  <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-bed"></i></span></div>
                  <div class="tag is-rounded"><span>{{sleepMap[sleep]}}</span></div>
                </span>
              </div>
              <div class="control">
                <span class="tags has-addons has-end-buffer" v-if="social>0">
                  <div class="tag is-primary is-rounded"><span class="icon has-text-white"><i class="fas fa-user-friends"></i></span></div>
                  <div class="tag is-rounded"><span>{{socialMap[social]}}</span></div>
                </span>
              </div>
            </div>
            <h5 class="subtitle is-5 left-align segment-title">{{name}}'s Bio</h5>
            <p class="left-align">{{bio}}</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import InterestTag from '@/components/InterestTag.vue';
import Vue from 'vue';
export default {
  name: 'FeedItem',
  props: ['name', 'age', 'gender', 'location', 'budget', 'subject', 'bio', 'drinking', 'smoking', 'diet', 'sleep', 'social', 'interests', 'profilePic'],
  data() {
    return {
      drinkingMap: {
        1: 'Not at all',
        2: 'Occasionally',
        3: 'Somewhat frequently',
        4: 'Frequently',
        5: 'Very frequently',
      },
      smokingMap: {
        1: 'Not at all',
        2: 'Rarely/socially',
        3: 'Often',
      },
      sleepMap: {
        1: 'Night owl',
        2: 'Flexible',
        3: 'Morning lark',
      },
      socialMap: {
        1: 'Extrovert',
        2: 'Introvert',
      },
      dietMap: {
        1: 'Vegetarian',
        2: 'Vegan',
        3: 'Eats meat',
      },
    };
  },
  async created() {
    const bytes = new Uint8Array(this.profilePic.data);
    const binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
    this.src = 'data:image/jpeg;base64,' + btoa(binary);
  },
  async mounted() {
    this.interests.forEach( (interest) => {
      this.appendInterestTag(interest['Interest']);
    });
  },
  methods: {
    getPic: function() {
      return this.src;
    },
    appendInterestTag(interest) {
      const ComponentClass = Vue.extend(InterestTag);
      const instance = new ComponentClass({
        propsData: {
          interest,
        },
      });
      instance.$mount(); // pass nothing
      this.$refs.interestcontainer.appendChild(instance.$el);
    },
  },
};
</script>

<style scoped>
.card{
  width: 100%;
  height: auto
}
img{
  width: 300px;
  height: 300px;
}
.left-align{
  text-align: left;
}
.has-bottom-divider{
  border-bottom: solid 1px;
  margin-bottom: 0.5rem;
}
.segment-title{
  margin-bottom: 0.5rem !important;
  margin-top: 1.5rem !important;
}
.tegs.has-end-buffer{
  margin-right: 2px;
  margin-left: 0px;
}
.tags:not(:last-child){
  margin-bottom: auto;
}
</style>
