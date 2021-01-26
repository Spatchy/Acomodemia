<template>
    <div>
        <h3 id="name">{{name}} </h3><h3 id="age"> {{age}} </h3>
        <profile-pic>
        <chat :name="name" :matchingID="matchingID">
    </div>
</template>

<script>
import chat from '@/components/Chat.vue'
export default {
  name: 'MatchedPerson',
  props: ['name', 'age', 'matchingID'],
  components: {
    chat
  },
  async created() {
    console.log(this.matchingID)
  }
}
</script>
