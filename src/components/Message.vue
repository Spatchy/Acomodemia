<template>
    <div >
      <div :class="{'level': true, 'sent': sent, 'received': !sent}">
        <div :class="{'level-right': sent,'level-left': !sent}">
          <span :class="{
            'level-item': true,
            'sent': sent,
            'received': !sent,
            'has-text-white': sent,
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
  max-width:49%;
  margin: 4px;
}

.level-item{
  text-align: left;
  overflow-wrap: break-word
}

.sent, .level-right{
  margin-left: 2px;
  margin-right: 2px;
}

.received, .level-left{
  margin-right: 2px;
  margin-left: 2px;
}

.level.sent{
  margin-left: auto;
  margin-right: 0.25rem;
  position: relative;
  background: #313266;
  border-radius: .4em;
}

.level.sent:after{
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-left-color: #313266;
  border-right: 0;
  border-top: 0;
  margin-top: -2.5px;
  margin-right: -4px;
}

.level.received{
  margin-right: auto;
  margin-left: 0.25rem;
  position: relative;
  background: white;
  border-radius: .4em;
}

.level.received:after{
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-right-color: white;
  border-left: 0;
  border-top: 0;
  margin-top: -2.5px;
  margin-left: -4px;
}
</style>
