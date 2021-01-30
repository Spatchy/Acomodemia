<template>
  <div>
    <h3> {{name}} </h3> <h3> {{age}} </h3>
    <input type="text" placeholder="Type your message here" v-model="message"/>
    <input type="button" value="Send" @click="send" />
    <div id="photo">
      <img :src="getPic()" alt="">
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import io from 'socket.io-client'

export default {
  name: 'Chat',
  props: ['matchingID'],
  data() {
    return {
      socket: io({
        query: {token: this.$store.getters.isLoggedIn} //returns the token to socket.io
      }),
      name: '',
      age: '', 
      photo: ''
    }
  },
  methods: {
    async send() {
      const payload = {
        body: this.message,
        recipient: this.matchingID
      }
      try {
        console.log(payload)
        const response = await this.socket.emit("message", payload)
      } catch(error){
        console.log(error)
      }
    },
    getPic: function () {
      return this.photo
    }
  },
  async created() {
    try {
      console.log(this.matchingID)
      var payload = {
        matchingID: this.matchingID
      }
      const response = await AuthService.getMatchByID(payload)
      this.name = response.name
      this.age = response.age
      var bytes = new Uint8Array(response.photo.data)
      var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '')
      this.photo = 'data:image/jpeg;base64,' + btoa(binary)
    } catch (error) {
      console.log(error)
    }

    this.socket.on("connect", () => {
      console.log(this.socket.id)
    })

    this.socket.on('message', (payload) => {
      console.log(`message ${payload.id} received from ${payload.from} at ${payload.timestamp}: "${payload.content}"`)
    })
  }
}
</script>