<template>
    <div>
      Logging you out
    </div>
</template>
<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('logout');
    this.$router.push('/');
  },
};
</script>
