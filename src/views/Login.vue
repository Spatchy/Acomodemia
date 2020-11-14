<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    import io from 'socket.io'
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                var socket = io();
                if(this.input.username != "" && this.input.password != "") {
                    socket.emit("login-attempt", [this.username.input, this.password.input])
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>