<template>
  <div>
    <div class="card">
      <div>
          <button class="delete" @click="showDeleteModal = true" style="float:right"></button>
      </div>
      <div class="card-content"  @click="clickEvent">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="getPic()" alt="">
            </figure>
        </div>
        <div class="media-content">
          <p class="title is-4 left-align">{{name}}, {{age}}</p>
          <p class="subtitle is-6 left-align" v-if="!currentlyChatting">Click to chat with {{name}}</p>
          <p class="subtitle is-6 left-align has-text-primary" v-if="currentlyChatting">Chatting with {{name}}</p>
        </div>
      </div>
    </div>
    <div :class="['modal', {'is-active': showDeleteModal}]">
      <div class="modal-background" @click="showDeleteModal = false"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title is-2">Unmatch</h2>
          <div class="section">
            <span class="icon is-huge has-text-danger">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
            <p class="deleteModalMessage">Are you sure that you want to unmatch with this person? this cannot be undone!.</p>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <div class="control is-expended">
                  <button class="button is-primary is-rounded" @click="showDeleteModal = false">
                    Go Back
                  </button>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <div class="control is-expanded">
                  <button class="button is-rounded is-danger" @click="unmatch()">
                    Unmatch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"  @click="showDeleteModal = false"></button>
      </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import router from '../router';
export default {
  name: 'MatchedPerson',
  props: ['name', 'age', 'matchingID', 'photo', 'currentlyChatting'],
  data() {
    return {
      pic: '',
      showDeleteModal: false,
      msg: '',
    };
  },
  async created() {
    console.log(this.matchingID);
    const bytes = new Uint8Array(this.photo.data);
    const binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
    this.pic = 'data:image/jpeg;base64,' + btoa(binary);
  },
  methods: {
    clickEvent: function() {
      router.push('/chat?to=' + this.matchingID);
    },
    getPic: function() {
      return this.pic;
    },
    async unmatch() {
      try {
        const credentials = {
          matchingId: this.matchingID,
        };
        const response = AuthService.unmatch(credentials);
        this.msg = response.msg;
      } catch (error) {
        console.error(error);
      }
      this.showDeleteModal = false;
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>
<style scoped>
.card{
  cursor: pointer;
  margin: 0.25rem;
}

.left-align{
  text-align: left;
}
</style>
