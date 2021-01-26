<template>
    <div>
        <h3> {{name}} </h3>
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
            recipient: '',
            msg: ''
        }
    },
    methods: {
        async send() {
            const message = {
                message: this.message,
                recipient: this.matchingID
            }
            try {
                const response = await AuthService.postMessage(message)
            } catch(error){
                console.log(error.response.data.msg)
            }
        }
    }
}
</script>