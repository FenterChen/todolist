<template>
  <div class="w-75 m-auto">
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Edit ID:{{ id }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3 w-75 container">
              <input
                type="text"
                class="form-control"
                placeholder="TASK"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                v-model="newtask"
              />
              <input
                type="text"
                class="form-control"
                placeholder="ASSIGNEE"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                v-model="newassignee"
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
            <button type="button" class="btn btn-primary" @click="edit">
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete data</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Are you sure to delete ID:{{ id }}?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="del">
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="table-primary text-muted text-capitalize">
        <tr>
          <th scope="col">edit</th>
          <th scope="col">id</th>
          <th scope="col">created_at</th>
          <th scope="col">updated_at</th>
          <th scope="col">task</th>
          <th scope="col">assignee</th>
          <th scope="col">delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <th scope="row">
            <img
              src="../assets/edit.png"
              alt="edit"
              class="edit w-25"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="editinfo(item)"
            />
          </th>
          <th scope="row" class="p-2">{{ item.id }}</th>
          <td class="p-2">{{ item.created_at }}</td>
          <td class="p-2">{{ item.updated_at }}</td>
          <td class="p-2">{{ item.task }}</td>
          <td class="p-2">{{ item.assignee }}</td>
          <th scope="row">
            <img
              src="../assets/trash.png"
              alt="edit"
              class="edit w-25"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              @click="delinfo(item)"
            />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";

const edit_list = gql`
  mutation editlist($id: Int!, $task: String!, $assignee: String!) {
    update_todo_list_by_pk(
      pk_columns: { id: $id }
      _set: { task: $task, assignee: $assignee }
    ) {
      id
      task
      assignee
    }
  }
`;

const del_list = gql`
  mutation dellist($id: Int!) {
    delete_todo_list_by_pk(id: $id) {
      id
    }
  }
`;

export default {
  name: "todolist",
  data() {
    return {
      list: [],
      id: "",
      newtask: "",
      newassignee: "",
    };
  },
  apollo: {
    clients: {
      query() {
        return gql`
          query MyQuery {
            todo_list(order_by: { updated_at: desc }) {
              id
              created_at
              updated_at
              task
              assignee
            }
          }
        `;
      },
      update(data) {
        this.list = data.todo_list;
      },
    },
  },
  mounted() {},
  methods: {
    editinfo(item) {
      this.id = item.id;
      this.newtask = item.task;
      this.newassignee = item.assignee;
    },
    delinfo(item) {
      this.id = item.id;
    },
    edit() {
      this.$apollo.mutate({
        mutation: edit_list,
        variables: {
          id: this.id,
          task: this.newtask,
          assignee: this.newassignee,
        },
        refetchQueries: ["list"],
      });
      location.reload();
    },
    del() {
      this.$apollo.mutate({
        mutation: del_list,
        variables: {
          id: this.id,
        },
        refetchQueries: ["list"],
      });
      location.reload();
    },
  },
};
</script>

<style>
.edit {
  cursor: pointer;
}
tr td {
  word-break: break-all;
}
</style>