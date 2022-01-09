<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png" />
    <div class="w-75 m-auto d-flex justify-content-between">
      <searchlist></searchlist>
      <addlist></addlist>
    </div>
    <todolist />
  </div>
</template>

<script>
import todolist from "./components/todolist.vue";
import addlist from "./components/addlist.vue";
import searchlist from "./components/searchlist.vue";

export default {
  name: "App",
  components: {
    todolist,
    searchlist,
    addlist,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 30px;
}
#app .logo {
  width: 5%;
  margin-bottom: 10px;
}
</style>
