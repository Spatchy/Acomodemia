<template>
  <div> 
    <div class="container">
      <div>
        <h1 class="title is-1">Sign Up</h1>


      <div class="field is-horizontal is-grouped is-grouped centered">
        <div class="field-body">
          <div class="field-label is-normal">
            <label class="label">First Name:</label>
          </div>
          <div class="field">
            <p class="control is-expanded">
            <input class="input is-rounded is-info" type="text" placeholder="First Name" v-model="firstName" /> 
            </p>
          </div>

          <div class="field-label is-normal">
            <label class="label">Second Name:</label>
          </div>
          <div class="field">
            <p class="control is-expanded">
                <input class="input is-rounded is-info" type="text" placeholder="Second Name" v-model="secondName" />
            </p>
          </div>
        </div>
      </div>


      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Gender:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded">
              <div class="select is-rounded is-info is-fullwidth">
                <select placeholder="please select" v-model="gender">
                  <option v-for="gend in genders" :key="gend">
                    {{gend}}
                  </option>
                </select>
              </div>
            </div>
          </div>          
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Date of Birth:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info is-fullwidth" type="date" placeholder="DD/MM/YYYY" v-model="dob" />
            </p>
          </div>
        </div>        
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Personal Email:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info" type="text" placeholder="e.g. bobsmith@gmail.com" v-model="username" />
            </p>
          </div>
        <div class="field-label is-normal">
          <label class="label">University Email:</label>
        </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info" type="text" placeholder="e.g. bs234@kent.ac.uk" v-model="uniEmail" />
            </p>
          </div>
        </div>
      </div>


      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Password:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info" type="password" placeholder="Password" v-model="password" />
            </p>
          </div>

        <div class="field-label is-normal">
          <label class="label">Confirm Password:</label>
        </div>
          <div class="field">
            <p class="control is-expanded">
              <input class="input is-rounded is-info" type="password" placeholder="Password (repeat)" v-model="password_repeat" />
            </p>
          </div>
        </div>
      </div>


        <!-- 
        <label class="label left">Personal Email Address:</label>
        <input class="input is-rounded" type="text" placeholder="Your Personal Email" v-model="username" />
        <br>

        <label class="label left">First Name:</label>
        <input class="input is-rounded" type="text" placeholder="First Name" v-model="firstName" />
        <br>
        
        <label class="label left">Second Name:</label>
        <input class="input is-rounded" type="text" placeholder="Second Name" v-model="secondName" />
        <br>
        
        <label class="label left">Date Of Birth:</label>
        <input class="input is-rounded" type="date" placeholder="Date of birth" v-model="dob" />
        <br>
        
        <label class="label left">University Email:</label>
        <input class="input is-rounded" type="text" placeholder="University email" v-model="uniEmail" />
        <br>
        
        <label class="label left">Gender:</label>
        <div class="select is-rounded signup">
          <select v-model="gender">
            <option v-for="gend in genders" :key="gend">{{gend}}</option>
          </select>
        </div>
        <br>

        <label class="label left">Password:</label>
        <input class="input is-rounded" type="password" placeholder="Password" v-model="password" />
        <br>
        
        <label class="label left">Repeat Password:</label>
        <input class="input is-rounded" type="password" placeholder="Password (repeat)" v-model="password_repeat" />
        <br>
        -->
       
       
        <input class="button is-rounded is-info" type="button" @click="signUp" value="Sign Up" />
        <br>
        <p v-if="msg">{{ msg }}</p>
        <p v-if="msg.length !== 0">
          <ul>
            <li v-for="error in errors" v-bind:key="error"> {{error}}</li>
          </ul>
        </p> 
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
import Confirm from '@/components/Confirm.vue'
export default {
  components: {
    Confirm
  },
  data () {
    return {
      genders: ['Female', 'Male', 'Rather Not Say', 'I Identify As...'],
      username: '',
      firstName: '',
      secondName: '',
      dob: '',
      uniEmail: '',
      gender: '',
      password: '',
      password_repeat: '',
      msg: '',
      component: 'Confirm',
      showConfirm: false
    }
  },
  methods: {
    async signUp () {
      try {
        const credentials = {
          username: this.username,
          firstName: this.firstName,
          secondName: this.secondName,
          dob: this.dob,
          uniEmail: this.uniEmail,
          gender: this.gender,
          password: this.password,
          password_repeat: this.password_repeat
        }
        const response = await AuthService.signUp(credentials)
        this.msg = response.msg

        const token = response.token
        const user = response.user
        this.$store.dispatch('login', { token, user })

        this.$router.push('/verify')
      } catch (error) {
        this.msg = error.response.data.msg
      }
    }
  }
}
</script>

<style scoped>

html {
  font-family: 'Jost', sans-serif;
}

label {
  width:180px;
  clear:left;
  text-align:right;
  padding-right:10px;
}

input, label, select {
  float:left;
}
</style>
