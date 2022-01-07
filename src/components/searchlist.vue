<template>
  <div class="row row-cols-lg-auto g-3 align-items-center">
    <div class="col-12">
      <label class="visually-hidden" for="inlineFormInputGroupUsername"
        >keyword</label
      >
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          id="inlineFormInputGroupUsername"
          placeholder="keyword"
          v-model="searchval"
        />
      </div>
    </div>

    <div class="col-12">
      <select class="form-select" id="inlineFormSelectPref">
        <option selected>Choose...</option>
        <option value="id">Id</option>
        <option value="task">Task</option>
        <option value="assignee">Assignee</option>
      </select>
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-info" @click="search">Search</button>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchlist",
  data() {
    return {
      task: "",
      assignee: "",
      searchval: "",
    };
  },
  methods: {
    search() {
      let search = this.searchval;
      this.list = this.list.filter(function (index) {
        return Object.keys(index).some(function (key) {
          return String(index[key]).indexOf(search) != -1;
        });
      });
    },
  },
};
</script>