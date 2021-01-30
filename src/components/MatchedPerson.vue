<template>
    <div @click="clickEvent">
        <h3 id="name">{{name}} </h3><h3 id="age"> {{age}} </h3>
        <profile-pic>
    </div>
</template>

<script>
import router from '../router'
export default {
  name: 'MatchedPerson',
  props: ['name', 'age', 'matchingID'],
  async created() {
    console.log(this.matchingID)
  },
  methods: {
    clickEvent: function () {
      router.push('/chat?to=' + this.matchingID)
    }
  }
}
</script>
