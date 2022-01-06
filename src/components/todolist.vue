<template>
  <div>
    <div class="editwindow" v-if="show"></div>
    <table class="container table w-75 table-striped">
      <thead class="table-primary text-muted text-uppercase">
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
              class="w-100 edit"
              @click="edit(item)"
            />
          </th>
          <th scope="row" class="p-2">{{ item.id }}</th>
          <td class="p-2">{{ item.created_at }}</td>
          <td class="p-2">{{ item.updated_at }}</td>
          <td class="p-2">{{ item.task }}</td>
          <td class="p-2">{{ item.assignee }}</td>
          <th scope="row">
            <img
              src="../assets/trush.svg"
              alt="edit"
              class="w-50 edit"
              @click="del(item)"
            />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";

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
      show: false,
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
  methods: {
    edit(item) {
      console.log(item.id);
    },
    del(item) {
      this.id = item.id;
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
  max-width: 400px;
  word-break: break-all;
}
</style>