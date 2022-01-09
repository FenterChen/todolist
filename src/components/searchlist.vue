<template>
  <div class="row row-cols-lg-auto g-3 align-items-center">
    <div class="col-12">
      <label class="visually-hidden" for="inlineFormInputGroupUsername"
        >Keyword</label
      >
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          id="inlineFormInputGroupUsername"
          placeholder="Keyword"
          v-model="searchval"
        />
      </div>
    </div>

    <div>
      <select
        class="form-select"
        id="inlineFormSelectPref"
        v-model="searchcolum"
      >
        <option value="All">All</option>
        <option value="Id">Id</option>
        <option value="Task">Task</option>
        <option value="Assignee">Assignee</option>
      </select>
    </div>

    <div>
      <button type="submit" class="btn btn-info" @click="search">Search</button>
    </div>
    <div>
      <button type="submit" class="btn btn-secondary" @click="reset">
        reset
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchlist",
  data() {
    return {
      searchcolum: "All",
      task: "",
      assignee: "",
      searchval: "",
    };
  },
  methods: {
    search() {
      let search = this.searchval;
      let newdata = [];
      if (this.searchcolum == "All") {
        this.$store.state.alllist = this.$store.state.alllist.filter(
          (index) => {
            return Object.keys(index).some((key) => {
              return String(index[key]).indexOf(search) != -1;
            });
          }
        );
      } else if (this.searchcolum == "Id") {
        this.$store.state.alllist.forEach((item) => {
          if (String(item.id).indexOf(search) != -1) {
            newdata.push(item);
          }
        });
        this.$store.state.alllist = newdata;
      } else if (this.searchcolum == "Task") {
        this.$store.state.alllist.forEach((item) => {
          if (String(item.task).indexOf(search) != -1) {
            newdata.push(item);
          }
        });
        this.$store.state.alllist = newdata;
      } else if (this.searchcolum == "Assignee") {
        this.$store.state.alllist.forEach((item) => {
          if (String(item.assignee).indexOf(search) != -1) {
            newdata.push(item);
          }
        });
        this.$store.state.alllist = newdata;
      }
      this.$store.commit("setlist", this.alllist);
    },
    reset() {
      this.searchval = "";
      location.reload();
    },
  },
  computed: {
    alllist() {
      return this.$store.state.alllist;
    },
  },
};
</script>