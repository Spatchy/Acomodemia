<template>
  <div class="outer-boundary">
    <div class="columns">
      <div class="column is-one-quarter" ref="matchedlist" id="matchedList">
        <div class="box">
          <h2 class="title is-2">Your Matches</h2>
        </div>
      </div>

      <div class="column">

        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <h2 class="title is-2"> {{name}}, {{age}}  </h2>
              </div>
            </div>

            <div class="media-right">
              <figure class="image is-48x48">
                <img :src="getPic()" alt="">
              </figure>
            </div>
          </article>
        </div>

        <div class="chat" ref="chat" @scroll="onScroll">
          <div ref="messageFeed"></div> <!--messages will be injected-->
        </div>

        <button id="scroll-to-bottom-btn" class="button is-primary" v-if="scrolled" @click="updateScroll(true)">
          <div class="icon">
            <i class="fas fa-chevron-down"></i>
          </div>
        </button>

        <div class="chatinput">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input is-rounded is-primary" type="text" placeholder="Type your message here" v-model="message" v-on:keyup.enter="send"/>
            </div>
            <div class="control">
              <input class="button is-rounded is-primary" type="button" value="Send" @click="send" />
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import io from 'socket.io-client';
import Vue from 'vue';
import Message from '@/components/Message.vue';

export default {
  name: 'Chat',
  props: ['matchingID'],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Message,
  },
  data() {
    return {
      socket: io({
        query: {token: this.$store.getters.isLoggedIn}, // returns the token to socket.io
      }),
      name: '',
      age: '',
      photo: '',
      message: '',
      sentMessage: '',
      scrolled: false,
      oldestMessageId: '',
    };
  },
  methods: {
    async send() {
      // checking if message is not empty string
      if (this.message.length > 0) {
        // console.log('start: ' + this.message);
        const payload = {
          body: this.message,
          recipient: this.matchingID,
        };
        try {
        // console.log(payload);
          await this.socket.emit('message', payload);
          this.sentMessage = payload.body;
        } catch (error) {
          console.log(error);
        }
        this.message = '';
      // console.log('end: ' + this.message);
      } else {
        return;
      }
    },
    getPic: function() {
      return this.photo;
    },
    displayMessage: function(message, messageID, sent, doPrepend = false) {
      const ComponentClass = Vue.extend(Message);
      const instance = new ComponentClass({
        propsData: {
          message: message,
          messageID: messageID,
          sent: sent,
        },
      });
      instance.$mount(); // pass nothing
      if (doPrepend) {
        this.$refs.messageFeed.prepend(instance.$el);
      } else {
        this.$refs.messageFeed.appendChild(instance.$el);
      }
    },
    updateScroll(override = false) { // snaps scroll to bottom
      if (!this.scrolled || override) { // will not activate if user has manually scrolled up
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      }
    },
    async onScroll(event) { // fired whenever the user scrolls the bound element (chat)
      if (event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight < 1) {
        this.scrolled = false;
      } else {
        this.scrolled = true;
        if (event.target.scrollTop === 0) {
          const scrollLockTarget = document.getElementById(this.oldestMessageId);
          console.log(scrollLockTarget);
          const payload = {
            matchingID: this.matchingID,
            oldestMessageId: this.oldestMessageId,
          };
          const feed = await AuthService.getChatHistory(payload);
          console.log(feed);
          this.$refs.chat.scrollTop = 1; // set the scrollbar down an unnoticable amount to stop it jumping to top of prepended content
          feed.forEach((element) => {
            this.displayMessage(element.message, element.id, element.sent, true);
            console.log(scrollLockTarget.clientHeight);
          });
          this.oldestMessageId = feed[feed.length - 1].id;
        }
      }
    },
  },
  async created() {
    try {
      console.log(this.matchingID);
      const payload = {
        matchingID: this.matchingID,
      };
      const response = await AuthService.getMatchByID(payload);
      this.name = response.name;
      this.age = response.age;
      const bytes = new Uint8Array(response.photo.data);
      const binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
      this.photo = 'data:image/jpeg;base64,' + btoa(binary);
    } catch (error) {
      console.log(error);
    }
    try {
      const credentials = {
        matchingID: this.matchingID,
      };
      console.log(credentials);
      const feed = await AuthService.getChatMostRecent(credentials);
      console.log(feed);
      feed.forEach((element) => {
        this.displayMessage(element.message, element.id, element.sent, true);
        this.updateScroll();
      });
      this.oldestMessageId = feed[feed.length - 1].id;
    } catch (error) {
      console.error(error);
    }

    this.socket.on('connect', () => {
      console.log(this.socket.id);
    });

    this.socket.on('message', (payload) => {
      console.log(`message ${payload.id} received from ${payload.from} at ${payload.timestamp}: "${payload.content}"`);
      if (payload.from == this.matchingID) {
        this.displayMessage(payload.content, payload.id, false);
        this.updateScroll();
      }
    });

    this.socket.on('success', (messageID) => {
      this.displayMessage(this.sentMessage, messageID, true);
      this.updateScroll();
    });
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

#scroll-to-bottom-btn{
  position: absolute;
  bottom: 5rem;
  right: 2rem;
  z-index: 1;
  width: fit-content;
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3);
  width: 4rem;
  height: 4rem;

}

.chat {
  overflow-y: scroll;
  flex-shrink: 1;
  flex-grow: inherit;
  position: relative;
}
</style>
