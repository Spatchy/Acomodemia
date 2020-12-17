<template>
    <div>
        <div ref="container">

        </div>
        <div id="controls">
            <p> {{matchMessage}} </p>
            <input type="button" value="Previous" @click="prev" />
            <input type="button" value="Hide" @click="reject" />
            <input type="button" value="Match" @click="match" />
            <input type="button" value="Next" @click="next" />
        </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import ProfilePic from '@/components/ProfilePic.vue'
import FeedItem from '@/components/FeedItem.vue'
import Vue from 'vue'
export default {
  name: 'Feed',
  components: {
    ProfilePic,
    FeedItem
  },
  data () {
    return {
      name: '',
      age: '',
      gender: '',
      location: '',
      budget: '',
      interests: [],
      drinking: '',
      smoking: '',
      diet: '',
      sleep: '',
      social: '',
      subject: '',
      bio: '',
      matchID: '',
      currentSuggestion: -1,
      res: [],
      matchMessage: '',
    }
  },
  async created () {
    var credentials = { page: 0 }
    console.log('created ran')
    const result = await AuthService.getFeed(credentials)
    console.log(result)
    this.res = result
    this.next()
  },
  methods: {
    next () {
      this.currentSuggestion += 1
      this.change()
    },
    prev () {
      this.currentSuggestion -= 1
      this.change()
    },
    change () {
      this.$refs.container.innerHTML = ''
      this.matchID = this.res[this.currentSuggestion].matchingId
      var ComponentClass = Vue.extend(FeedItem)
      var instance = new ComponentClass({
        propsData: {
          name: this.res[this.currentSuggestion].name,
          age: this.res[this.currentSuggestion].age,
          gender: this.res[this.currentSuggestion].gender,
          location: this.res[this.currentSuggestion].location,
          budget: this.res[this.currentSuggestion].budget,
          subject: this.res[this.currentSuggestion].subject,
          bio: this.res[this.currentSuggestion].bio,
          drinking: this.drinking = this.res[this.currentSuggestion].drinking,
          smoking: this.res[this.currentSuggestion].smoking,
          diet: this.res[this.currentSuggestion].diet,
          sleep: this.res[this.currentSuggestion].sleep,
          social: this.res[this.currentSuggestion].social,
          interests: this.res[this.currentSuggestion].interests
        }
      })
      instance.$mount() // pass nothing
      this.$refs.container.appendChild(instance.$el)
    },
    async match() {
      try {
        this.res.splice(this.currentSuggestion, 1)
        const credentials = {
          matchingId: this.matchID
        }
        const response = await AuthService.requestMatch(credentials)
        this.matchMessage = response.msg
        next()
      } catch(error) {
        this.matchMessage = error.response.data.msg
      }
    },
    async reject() {
      try {
        this.res.splice(this.currentSuggestion, 1)
        this.res[this.currentSuggestion]
        const credentials = {
          matchingId: this.matchID
        }
        const response = await AuthService.reject(credentials)
        this.matchMessage = response.msg
        next()
      } catch(error) {
        this.matchMessage = error.response.data.msg
      }
    }
  }
}
</script>
