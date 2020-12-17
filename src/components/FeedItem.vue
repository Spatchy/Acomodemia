<template>
    <div>
        <div>
            <h3 id="name">{{name}} </h3><h3 id="age"> {{age}} </h3>
            <profile-pic>
        </div>
        <div id="Details">
            <br>
            <p>GENDER: {{gender}} </p><br>
            <p>LOCATION: {{location}} </p><br>
            <p>BUDGET: {{budget}} </p><br>
            <p>INTERESTS: {{interests}} </p><br>
            <p>LIFESTYLE:  </p><br>
            <p>SUBJECT: {{subject}} </p><br>
        </div>
        <div id="bioDiv">
            <h3>Bio: {{bio}} </h3>
            <p></p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'FeedItem',
  props: ['name', 'age', 'gender', 'location', 'budget', 'subject', 'bio', 'drinking', 'smoking', 'diet', 'sleep', 'social', 'interests']
}
</script>
