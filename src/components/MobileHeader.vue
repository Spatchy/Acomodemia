<template>
  <div>
    <div class="level is-mobile has-background-primary">
      <div class="level-item"><h6 class="title is-6 has-text-white">Matches</h6></div>
      <div class="level-item"><h6 class="title is-6 has-text-white">Feed</h6></div>
      <div class="level-item"><h6 class="title is-6 has-text-white">Settings</h6></div>
      <div class="indicator" ref="indicator"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MobileHeader',
};
</script>
<style la scoped>
.level{
  height: 64px;
  margin-bottom: 4px;
  position: relative;
}
.indicator{
  position: absolute;
  width: calc(100% / 3);
  height: 3px;
  bottom: 0;
  background-color: white;
}
</style>
