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
  props: ['offsetMultiplier'],
  data() {
    return {
      offset: 0,
    };
  },
  computed: {
    indicatorWidth() {
      return this.$refs.indicator.clientWidth;
    },
    initialOffset() {
      return this.indicatorWidth * this.offsetMultiplier;
    },
  },
  methods: {
    animate(doBackwards = false) {
      let id = null;
      let moved = 0;
      let animWidth = this.indicatorWidth;
      let translated = 0;
      clearInterval(id);
      id = setInterval(() => {
        if (moved == this.indicatorWidth) {
          clearInterval(id);
          this.offset += translated;
        } else {
          moved++;
          if (doBackwards) {
            this.$refs.indicator.style.left = (this.offset - moved) + 'px';
            translated -= 1;
          } else {
            this.$refs.indicator.style.left = (this.offset + moved) + 'px';
            translated += 1;
          }
          animWidth-=2;
          this.$refs.indicator.style.width = Math.abs(animWidth) + 'px';
        }
      }, 1);
    },
  },
  mounted() {
    this.offset = this.initialOffset;
    this.$refs.indicator.style.left = this.offset + 'px';
  },
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
