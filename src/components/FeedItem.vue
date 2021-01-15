<template>
    <div>
        <div>
            <h3 id="name">{{name}} </h3><h3 id="age"> {{age}} </h3>
            <profile-pic>
        </div>
        <div id="Details">
            <br>
            <p>GENDER: {{gender}} </p><br>
            <p>LOCATION: {{location}} </p><br>
            <p>BUDGET: {{budget}} </p><br>
            <p>INTERESTS: {{interests}} </p><br>
            <p>LIFESTYLE:  </p><br>
            <p>SUBJECT: {{subject}} </p><br>
        </div>
        <div id="bioDiv">
            <h3>Bio: {{bio}} </h3>
            <p></p>
        </div>
        <div id="photo">
            <img :src="getPic()" alt="">
        </div>
    </div>
</template>
<script>
export default {
  name: 'FeedItem',
  props: ['name', 'age', 'gender', 'location', 'budget', 'subject', 'bio', 'drinking', 'smoking', 'diet', 'sleep', 'social', 'interests', 'profilePic'],
  async created () {
    console.log(this.profilePic.data)
    var bytes = new Uint8Array(this.profilePic.data)
    var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '')
    this.src = 'data:image/jpeg;base64,' + btoa(binary)
    console.log('Source boi: ' + this.src)
  },
  methods: {
    getPic: function () {
      return this.src
    }
  }
}
</script>
