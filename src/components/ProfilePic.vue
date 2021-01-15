<template>
    <img :src="getPic()" alt="">
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
  data () {
    // empty image
    return {
      src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }
  },
  async created () {
    var response = await AuthService.getProfilePic()
    var bytes = new Uint8Array(response)
    var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '')
    this.src = 'data:image/jpeg;base64,' + btoa(binary)
  },
  methods: {
    getPic: function () {
      return this.src
    }
  }
}
</script>
