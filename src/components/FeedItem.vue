<template>
    <div>
        <div>
            <h3 class="title" id="name">{{name}} </h3><h3 class="title" id="age"> AGE: {{age}} </h3>
            <profile-pic>
        </div>
        <div id="Details">
            <br>
            <h5 >GENDER:</h5> {{gender}} <br>
            <h5>LOCATION: </h5>{{location}} <br>
            <h5>BUDGET: </h5>{{budget}} <br>
            <h5>INTERESTS: </h5> <p>{{interests}}</p><br>
            <h5>LIFESTYLE:  </h5> {{lifestyle}} <br>
            <h5>SUBJECT: </h5> {{subject}} <br>
        </div>
        <div id="bioDiv">
            <h5>Bio: </h5>{{bio}} <br>
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
    var bytes = new Uint8Array(this.profilePic.data)
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
