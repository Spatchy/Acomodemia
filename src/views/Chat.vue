<template>
  <div>
    <h3> {{name}} </h3>
    <input type="text" placeholder="Type your message here" v-model="message"/>
    <input type="button" value="Send" @click="send" />
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import io from 'socket.io-client'

export default {
  name: 'Chat',
  props: ['name', 'matchingID'],
  data() {
    return {
      socket: io({
        query: {token: this.$store.getters.isLoggedIn} //returns the token to socket.io
      })
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
    }
  },
  async created() {
    this.socket.on("connect", () => {
      console.log(this.socket.id)
    })

    this.socket.on('message', (payload) => {
      console.log(`message ${payload.id} received from ${payload.from} at ${payload.timestamp}: "${payload.content}"`)
    })
  }
}
</script>