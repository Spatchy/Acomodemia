<template>
    <div @click="clickEvent">
        <h3 id="name">{{name}} </h3><h3 id="age"> {{age}} </h3>
        <img style="width: 50px; height: 50px;" :src="getPic()" alt="">
    </div>
</template>

<script>
import router from '../router';
export default {
  name: 'MatchedPerson',
  props: ['name', 'age', 'matchingID', 'photo'],
  data() {
    return {
      pic: '',
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
  },
};
</script>
