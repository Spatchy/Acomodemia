<template>
    <div>
        <div>
            <logout>
        </div>
        <div ref="matchedlist" style="float:left"></div>
        <div>
            <h2>Feed</h2>
            <feed>
        </div>
    </div>
</template>
<script>
import Feed from '@/components/Feed.vue'
import Logout from '@/components/Logout.vue'
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
    Logout,
    MatchedPerson
  },
  methods: {
    displayMatches (match) {
      var ComponentClass = Vue.extend(MatchedPerson)
      var instance = new ComponentClass({
        propsData: {
          name: match.name,
          age: match.age
        }
      })
      instance.$mount() // pass nothing
      this.$refs.matchedlist.appendChild(instance.$el)
    }
  },
  async created () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/')
    }
    if (!this.$store.getters.isVerified) {
      this.$router.push('/verify') // redirect user to verify if not verified
    }
    this.matchesList = await AuthService.getMatches()
    this.matchesList.forEach(element => {
      this.displayMatches(element)
    })
  }
}
</script>
