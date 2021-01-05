<template>
    <div>
        <h3 id="name">{{name}} </h3><h3 id="age"> {{age}} </h3>
        <profile-pic>
    </div>
</template>

<script>
export default {
  name: 'MatchedPerson',
  props: ['name', 'age']
}
</script>
