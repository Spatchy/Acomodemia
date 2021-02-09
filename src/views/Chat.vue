<template>

  <div id="container3">

    <div id="left_container">
      <div class="content">
        <h1 class="title is-1" style="padding: 10px 10px 10px 10px;"> Chats </h1>
      </div>  
    </div>

    
    <div id="right_container">

      <div class="chatheader">
          <h1 class="title is-1" style="padding: 10px 10px 10px 10px; float:left;"> {{name}}, {{age}}  </h1>
          <img :src="getPic()" alt="" width="150" height="150" style="padding: 10px 10px 10px 10px; float:right;">
      </div>

      <div class="chat">
        <div ref="messageFeed">
          <br />
        </div>
      </div>

      <div class="chatinput">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-rounded is-info" type="text" placeholder="Type your message here" v-model="message"/>
          </div>
          <div class="control">
            <input class="button is-rounded is-info" type="button" value="Send" @click="send" />
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
    };
  },
  methods: {
    async send() {
      console.log('start: ' + this.message);
      const payload = {
        body: this.message,
        recipient: this.matchingID,
      };
      try {
        console.log(payload);
        await this.socket.emit('message', payload);
        this.sentMessage = payload.body;
      } catch (error) {
        console.log(error);
      }
      this.message = '';
      console.log('end: ' + this.message);
    },
    getPic: function() {
      return this.photo;
    },
    displayMessage: function(message, messageID, sent) {
      const ComponentClass = Vue.extend(Message);
      const instance = new ComponentClass({
        propsData: {
          message: message,
          messageID: messageID,
          sent: sent,
        },
      });
      instance.$mount(); // pass nothing
      this.$refs.messageFeed.appendChild(instance.$el);
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
      const feed = await AuthService.getChatHistory(credentials);
      console.log(feed);
      feed.forEach((element) => {
        this.displayMessage(element.message, element.id, element.sent);
      });
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
      }
    });

    this.socket.on('success', (messageID) => {
      this.displayMessage(this.sentMessage, messageID, true);
    });
  },
};
</script>
