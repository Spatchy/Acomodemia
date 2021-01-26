<template>
    <div>
        <input type="text" placeholder="Type your message here" v-model="message"/>
        <input type="button" value="Send" @click="send" />
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'

export default {
    name: 'Chat',
    props: ['name, picture, matchingID'],
    data() {
        return {
            message: '',
            recipient: ''
        }
    },
    methods: {
        async send() {
            //send the message to server
        }
    }
}
</script>