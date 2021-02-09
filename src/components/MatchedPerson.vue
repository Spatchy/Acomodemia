<template>
    <div class="card" @click="clickEvent">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="getPic()" alt="">
            </figure>
        </div>
        <div class="media-content">
          <p class="title is-4 left-align">{{name}}, {{age}}</p>
          <p class="subtitle is-6 left-align">Click to chat with {{name}}</p>
      </div>
      <div>
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
<style scoped>
.card{
  cursor: pointer;
  margin: 0.25rem;
}

.left-align{
  text-align: left;
}
</style>
