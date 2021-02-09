<template>
  <span class="tag is-rounded">
    {{interest}}
  </span>
</template>
<script>
export default {
  name: 'InterestTag',
  props: ['interest'],
};
</script>
<style scoped>
.tag{
  margin-right: 2px;
  margin-left: 0px;
}
</style>
