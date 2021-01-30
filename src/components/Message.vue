<template>
    <div v-bind:class="{Sent: sent, recieved : !sent }" >
        <p> {{message}} </p>
    </div>
</template>
<script>
export default {
    name: 'Message',
    props: ['message', 'messageID', 'sent']
}
</script>
<style>
.Sent{
    background-color: blue;
    color: white;
    float: right;
}
.recieved {
    background-color: gray;
    float: left;
}
</style>