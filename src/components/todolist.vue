<template>
  <div class="w-75 m-auto">
    <select
      class="form-select mb-1 d-flex align-items-center"
      v-model="psize"
      aria-label=".form-select-lg example"
    >
      <option value="5" selected>每頁5筆</option>
      <option value="10">每頁10筆</option>
      <option value="25">每頁25筆</option>
      <option value="50">每頁50筆</option>
    </select>
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
              Edit Id:{{ id }}
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
          <th scope="row" class="p-2">
            <img
              src="../assets/edit.png"
              alt="edit"
              class="edit"
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
          <th scope="row" class="p-2">
            <img
              src="../assets/trash.png"
              alt="edit"
              class="edit"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              @click="delinfo(item)"
            />
          </th>
        </tr>
      </tbody>
    </table>
    <div
      class="btn-toolbar d-flex justify-content-end"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <div
        class="btn-group btn-group-mg mr-2 m-2"
        role="group"
        aria-label="Second group"
      >
        <h5 class="font-weight-light h-100 w-100 d-flex align-items-center">
          總共{{ num }}筆，{{ totalPage }}頁
        </h5>
        <button type="button" class="btn btn-secondary" @click="first">
          First
        </button>
        <button type="button" class="btn btn-secondary" @click="previouspage">
          &lt;
        </button>
        <div class="switchtext text-white h-100 bg-secondary">{{ pno }}</div>
        <button type="button" class="btn btn-secondary" @click="nextpage">
          &gt;
        </button>
        <button type="button" class="btn btn-secondary" @click="last">
          Last
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
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
      pno: 1, //目前頁數
      psize: 5, //頁面筆數
      currentPage: 1, //目前頁面
      totalPage: 0, //總頁數
      num: 0, //表格數量
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
        this.$store.commit("setlist", this.list);
      },
    },
  },
  updated() {
    this.num = this.list.length; //表格數量
    //總共分幾頁
    if (this.num / this.psize > parseInt(this.num / this.psize)) {
      this.totalPage = parseInt(this.num / this.psize) + 1;
    } else {
      this.totalPage = parseInt(this.num / this.psize);
    }
    this.currentPage = this.pno; //目前頁數
    let startRow = (this.currentPage - 1) * this.psize + 1; //開始顯示行
    let endRow = this.currentPage * this.psize; //結束顯示行
    endRow = endRow > this.num ? this.num : endRow;
    for (let i = 1; i < this.num + 1; i++) {
      if (i >= startRow && i <= endRow) {
        $(".table tbody tr:nth-child(" + i + ")").css({
          display: "table-row",
        });
      } else {
        $(".table tbody tr:nth-child(" + i + ")").css({
          display: "none",
        });
      }
    }
  },
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
    nextpage() {
      this.currentPage = this.pno; //目前頁數
      let endRow = this.currentPage * this.psize; //結束顯示行
      endRow = endRow > this.num ? this.num : endRow;
      if (this.currentPage < this.totalPage) {
        this.pno += 1;
      }
    },
    previouspage() {
      this.currentPage = this.pno; //目前頁數
      let endRow = this.currentPage * this.psize; //結束顯示行
      endRow = endRow > this.num ? this.num : endRow;
      if (this.currentPage > 1) {
        this.pno -= 1;
      } else if (this.currentPage == 1) {
        this.pno = 1;
      }
    },
    first() {
      this.pno = 1;
    },
    last() {
      this.pno = this.totalPage;
    },
  },
  computed: {
    alllist() {
      return this.$store.state.alllist;
    },
  },
  watch: {
    alllist() {
      this.list = this.alllist;
      this.pno = 1;
    },
  },
};
</script>

<style>
.edit {
  cursor: pointer;
  width: 30px;
}
tr td {
  font-size: 14px;
  word-break: break-all;
}
.switchtext {
  font-size: 1.25rem;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
h5 {
  margin-right: 20px;
}
</style>