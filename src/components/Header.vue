<template>
  <div class="header" v-if="!exclude.includes($route.name)">
    <img alt="our logo" align="left" src="../assets/ourlogo.png">
    <div class="header-right">
    <a href="#about">About</a>
    <div>
      <logout>
    </div>
  </div>
</div>
</template>

<script>
import Logout from "@/components/Logout.vue";
export default {
  data() {
    return {
      exclude: ['Login', 'Sign-up'] // List of pages to not show the header, uses the route name as definied in router/index.js
    }
  },
  components: {
    Logout
  }
}
</script>

<style>
.header {
  overflow: hidden;
  background-color: #ffffff;
  /* padding: 20px 10px; */
}

/* Style the header links */
.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 20px;
  text-decoration: none;
  font-size: 15px;
  /* dont adjust line-height  */
  line-height: 35px;
  border-radius: 4px;
}

/* Change the background color on mouse-over */
.header a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header a.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
</style>
