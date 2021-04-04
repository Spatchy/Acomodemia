<template>
<div>
  <mobile-container :startOn="'Feed'" v-if="$isMobile()"></mobile-container>
  <matchpage v-else></matchpage>
</div>
</template>
<script>
import Matchpage from '@/components/Matching.vue';
import MobileContainer from '@/components/MobileContainer.vue';
export default {
  name: 'Matching',
  components: {
    Matchpage,
    MobileContainer,
  },
};
</script>
