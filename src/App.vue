<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
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
#app img {
  width: 5%;
  margin-bottom: 10px;
}
</style>
