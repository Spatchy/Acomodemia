<template>
    <div v-bind:class="{Sent: sent, recieved : !sent }" :messageId="messageID">
       <p> <span> {{message}} </span> </p>
    </div>

</template>
<script>
export default {
  name: 'Message',
  props: ['message', 'messageID', 'sent'],
};
</script>
<style>
.Sent{
    background-color: #3498db;
    color: white;
    float: right;
}
.recieved {
    background-color: #EFF0EB;
    color: #3498db;
    float: left;
}
p span {
  display: block;
}
</style>
