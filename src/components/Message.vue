<template>
    <div >
      <div :class="{'level': true, 'sent': sent, 'received': !sent}">
        <div :class="{'level-right': sent,'level-left': !sent}">
          <span :class="['level-item', 'message-content', {
            'sent': sent,
            'received': !sent,
            'has-text-white': sent,
            'has-text-primary': !sent
          }]"
          :messageId="messageID"
          :id="messageID"
          v-html="linkify(message)">
          </span>
        </div>
      </div>
    </div>
</template>

<script>
import anchorme from 'anchorme';
export default {
  name: 'Message',
  props: ['message', 'messageID', 'sent'],
  methods: {
    linkify(str) {
      return anchorme(str);
    },
  },
};
</script>

<style scoped>
.level{
  max-width:75%;
  margin: 4px;
  width: fit-content;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.level-item{
  text-align: left;
  overflow-wrap: break-word;
  width: 100%;
}

.level-left, .level-right{
  width: 100%;
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
  box-shadow: 0 4px 10px 0 rgba(0,0,0,0.3);
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
  box-shadow: 3px 4px 10px 0 rgba(0,0,0,0.3);
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
