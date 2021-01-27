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
    props: ['name', 'matchingID'],
    methods: {
        async send() {
            const payload = {
                message: this.message,
                recipient: this.matchingID
            }
            try {
                console.log(payload)
                const response = await AuthService.postMessage(payload)
            } catch(error){
                console.log(error.response.data.msg)
            }
        }
    },
    async created() {
        console.log(this.name + " " + this.matchingID)
    }
}
</script>