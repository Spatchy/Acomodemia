<template>
    <div>
        <div ref="matchedlist" style="float:left"></div>
        <div>
            <h2>Feed</h2>
            <feed>
        </div>
    </div>
</template>
<script>
import Feed from '@/components/Feed.vue'
import AuthService from '@/services/AuthService.js'
import MatchedPerson from '@/components/MatchedPerson.vue'
import Vue from 'vue'

export default {
  name: 'Matching',
  data () {
    return {
      matchesList: []
    }
  },
  components: {
    Feed,
    MatchedPerson
  },
  methods: {
    displayMatches (match) {
      var ComponentClass = Vue.extend(MatchedPerson)
      var instance = new ComponentClass({
        propsData: {
          name: match.name,
          age: match.age,
          matchingID: match.matchingID,
          photo: match.photo
        }
      })
      instance.$mount() // pass nothing
      this.$refs.matchedlist.appendChild(instance.$el)
    }
  },
  async mounted () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/')
    }
    if (!this.$store.getters.isVerified) {
      this.$router.push('/verify') // redirect user to verify if not verified
    }
    if (!this.$store.getters.getUser.EssentialSettingsComplete) {
      this.$router.push('/Complete') // redirect user to complete their essential settings
    }
  },
  async created () {
    this.matchesList = await AuthService.getMatches()
    this.matchesList.forEach(element => {
      this.displayMatches(element)
      console.log(element.matchingID)
    })
  }
}
</script>
