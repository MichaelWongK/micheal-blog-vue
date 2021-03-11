<template>
  <div id="app"  style="overflow-x: auto">
    <router-view/>
  </div>
</template>
<script>


  export default {
    data() {
      return {

      }
    },
    created() {


    }
  }
</script>
<style>
  body {
    width: 100vw;
    height: 100vh;

  }
  #app {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
  }
  *{
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Tahoma, Arial, "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: #34495e;
  }
</style>
