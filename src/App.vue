<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <addlist />
    <todolist />
  </div>
</template>

<script>
import todolist from "./components/todolist.vue";
import addlist from "./components/addlist.vue";

export default {
  name: "App",
  components: {
    todolist,
    addlist,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 30px;
}
#app img {
  width: 10%;
  margin-bottom: 10px;
}
</style>
