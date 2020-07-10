<template>
  <div class="hello">
    <h1>Rich Text Editor's Prototypes</h1>
    <p>{{ msg }}</p>
    <div class="row text-left">
      <ul>
        <li><router-link to="/quill">Quill Editor</router-link></li>
        <li><router-link to="/prosmirror">Prosmirror Editor</router-link></li>
        <li><router-link to="/tinyMCE">TinyMCE Editor</router-link></li>
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
  padding: 10px;
  font-size:1em
}
p {
  padding: 5px;
  text-align: left;
}
.text-left {
  text-align: left;
  font-size: 1.5em;
}
</style>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default {
  data() {
    return {
      msg: 'This is a project for our new Rich Text Editor Poc.In which i have included some of the well known and most used rich text editors. I have made a prototype for each of them feel free to try out each one out and integrate as much features as you can."Click the links below to access them !"',
    };
  },
};
</script>
