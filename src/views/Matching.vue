<template>
    <div>
        <div>
            <logout>
        </div>
        <div ref="matchedlist"></div>
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

export default {
  name: 'Matching',
  data() {
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
    displayMatches (matchNumber) {
      var ComponentClass = Vue.extend(MatchedPerson)
      var instance = new ComponentClass({
        propsData: {
          name: this.matchesList[matchNumber].name,
          age: this.matchesList[matchNumber].age
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
    this.matchesList = await AuthService.getMatches()
  }
}
</script>
