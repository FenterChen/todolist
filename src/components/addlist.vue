<template>
  <div class="input-group mb-3 w-75 container">
    <input
      type="text"
      class="form-control"
      placeholder="TASK"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      v-model="task"
    />
    <input
      type="text"
      class="form-control"
      placeholder="ASSIGNEE"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      v-model="assignee"
    />
    <div class="input-group-append">
      <button @click="add" class="input-group-text" id="basic-addon2">
        add
      </button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const add_list = gql`
  mutation addlist($task: String!, $assignee: String!) {
    insert_todo_list(objects: [{ task: $task, assignee: $assignee }]) {
      returning {
        id
      }
    }
  }
`;

export default {
  name: "addlist",
  data() {
    return {
      task: null,
      assignee: null,
    };
  },
  methods: {
    add() {
      const { task, assignee } = this.$data;
      this.$apollo.mutate({
        mutation: add_list,
        variables: {
          task,
          assignee,
        },
        refetchQueries: ["list"],
      });
      this.task = "";
      this.assignee = "";
      location.reload();
    },
  },
};
</script>