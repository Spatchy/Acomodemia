<template>
    <div >
      <div :class="{'level': true, 'sent': sent, 'received': !sent}">
        <div :class="{'level-right': sent,'level-left': !sent}">
          <span :class="{
            'level-item': true,
            'sent': sent,
            'received': !sent,
            'has-background-primary': sent,
            'has-text-white': sent,
            'has-background-white': !sent,
            'has-text-primary': !sent
          }" :messageId="messageID">
            {{message}}
          </span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Message',
  props: ['message', 'messageID', 'sent'],
};
</script>
<style scoped>
.level{
  max-width:85%;
}
.level-item{
  text-align: left;
  overflow-wrap: break-word;
}
.sent, .level-right{
  margin-left: auto;
  margin-right: 0;
}
.received, .level-left{
  margin-right: auto;
  margin-left: 0;
}
.level.sent{
  margin-left: auto;
  margin-right: 0.25rem;
}
.level.received{
  margin-right: auto;
  margin-left: 0.25rem;
}
</style>
