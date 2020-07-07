<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="row text-left">
      <ul>
        <li><router-link to="/quill">Quill Editor</router-link></li>
        <li><router-link to="/prosmirror">Prosmirror Editor</router-link></li>
        <li><router-link to="/slate">Slate Editor</router-link></li>
      </ul>
    </div>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text-left {
  text-align: left;
  font-size: 2em;
}
</style>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default {
  data() {
    return {
      msg: 'Rich Text Editor Poc',
    };
  },
}
</script>
