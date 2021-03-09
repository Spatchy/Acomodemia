<template>
<div>
  <mobile-container :startOn="'Feed'" v-if="$isMobile()"></mobile-container>
  <matching v-else></matching>
</div>
</template>
<script>
import Matching from '@/components/Matching.vue';
import MobileContainer from '@/components/MobileContainer.vue';
export default {
  name: 'Matching',
  components: {
    Matching,
    MobileContainer,
  },
};
</script>
