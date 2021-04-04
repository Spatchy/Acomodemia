<template>
    <div>
        <confirm/>
    </div>
</template>

<script>
import Confirm from '../components/Confirm.vue';

export default {
  name: 'Complete',
  components: {
    Confirm,
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/');
    }
    if (this.$store.getters.isVerified) {
      this.$router.push('/feed'); // redirect user to feed if they're verified already
    }
  },
};
</script>
