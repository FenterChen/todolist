<template>
  <div>
    <button
      type="button"
      class="btn btn-primary float-right m-3"
      data-bs-toggle="modal"
      data-bs-target="#example"
    >
      Add List
    </button>
    <div
      class="modal fade"
      id="example"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add list</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            .
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="add">
              confirm
            </button>
          </div>
        </div>
      </div>
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
      task: "",
      assignee: "",
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