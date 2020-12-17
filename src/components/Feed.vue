<template>
    <div>
        <div>
            <h3 id="name"></h3><h3 id="age"></h3>
            <profile-pic>
        </div>
        <div id="Details">
            <br>
            <p>GENDER: </p><br>
            <p>LOCATION: </p><br>
            <p>BUDGET: </p><br>
            <p>INTERESTS: </p><br>
            <p>LIFESTYLE: </p><br>
            <p>SUBJECT: </p><br>
        </div>
        <div id="bioDiv">
            <h3>Bio:</h3>
            <p></p>
        </div>
        <div id="controls">
            <input type="button" value="Previous" @click="prev" />
            <input type="button" value="Hide" @click="hide" />
            <input type="button" value="Match" @click="match" />
            <input type="button" value="Next" @click="next" />
        </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import ProfilePic from '@/components/ProfilePic.vue'
export default {
    name: 'Feed',
    components: {
        ProfilePic
    },
    data() {
        return {
            name: '',
            age: '',
            gender: '',
            location: '',
            budget: '',
            interests: [],
            lifestyle: [],
            subject: '',
            bio: ''
        }
    }
}
</script>