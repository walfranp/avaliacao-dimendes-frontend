<template>
  <div class="row mt-3" style="text-align: left">
    <div class="col-8 offset-2">
      <div class="card">
        <div class="card-header bg-primary text-white">Cadastro de tarefas</div>
        <div class="card-body">
          <div style="flex-container">
            <form @submit.prevent="registerTask">
              <div class="row">
                <div class="col-4 ml-3">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="task"
                    name="task"
                    placeholder="título da tarefa"
                    v-model="taskRegister.title"
                    required
                  />
                </div>
                <div class="col-6">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="description"
                    name="description"
                    placeholder="descrição da tarefa"
                    v-model="taskRegister.description"
                    required
                  />
                </div>
                <div class="col-2">
                  <button
                    class="btn btn-primary btn-sm"
                    type="submit"
                    id="cadastrar"
                    name="cadastrar"
                  >
                    Registrar tarefa
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="col-8 offset-2">
      <div class="card mt-3">
        <div class="card-body">
          <!-- search -->
          <div class="row mb-3">
            <div class="col-4 ml-3">
              <input
                type="text"
                class="form-control form-control-sm"
                id="find"
                name="find"
                placeholder="pesquisar tarefa"
                v-model="paramsGetTask.search"
                required
              />
            </div>
            <div class="col-1">
              <button
                @click="getTasks"
                class="btn btn-primary btn-sm"
                type="submit"
                id="cadastrar"
                name="cadastrar"
              >
                Busacar
              </button>
            </div>

            <div
              class="col-5 offset-2"
              style="border: 0px solid; text-align: right"
            >
              <div class="form-check form-check-inline">
                <input
                  @click="setTaskFilter(2)"
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioOrderDate"
                  checked
                />
                <label class="form-check-label" for="radioOrderDate">
                  Odenar por data
                </label>
              </div>

              <div class="form-check form-check-inline">
                <input
                  @click="setTaskFilter(1)"
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioOrderTitle"
                />
                <label class="form-check-label" for="radioOrderTitle">
                  Ordenar por título
                </label>
              </div>
            </div>
          </div>
          <!-- end search -->

          <table
            class="table table-responsive table-striped table-hover table-sm"
          >
            <thead>
              <tr>
                <th>Titulo da tarefa</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>#</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="task in taskList" :key="task.id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.created_date }}</td>
                <td>
                  <button
                    @click="getTaskById(task.id)"
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#editTaskModal"
                  >
                    Alterar
                  </button>
                </td>
                <td>
                  <button
                    @click="selectTastToDelete(task.id)"
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteTaskModal"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- pagination -->
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              @click="
                getTasksByPage(
                  paramsGetTask.page == 1
                    ? (paramsGetTask.page = paramsGetTask.page)
                    : paramsGetTask.page - 1
                )
              "
              href="#"
              >Anterior</a
            >
          </li>
          <li
            class="page-item"
            v-for="index in this.paramsGetTask.pages"
            :key="index"
          >
            <a class="page-link" @click="getTasksByPage(index)" href="#">{{
              index
            }}</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              @click="
                getTasksByPage(
                  paramsGetTask.page < paramsGetTask.total_page
                    ? paramsGetTask.page + 1
                    : (paramsGetTask.page = paramsGetTask.page)
                )
              "
              href="#"
              >Próximo</a
            >
          </li>
        </ul>
      </nav>
      <!-- end pagination -->

    </div>

    <!-- Modal edit-->
    <div
      class="modal fade"
      id="editTaskModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-6" id="exampleModalLabel">
              Alterar tarefa
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="title-task" class="col-form-label">Tarefa:</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="title-task"
                  v-model="taskUpdate.title"
                />
              </div>
              <div class="mb-3">
                <label for="description-task" class="col-form-label"
                  >Descrição:</label
                >
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="description-task"
                  v-model="taskUpdate.description"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              @click="updateTaskSelected"
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-dismiss="modal"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal edit -->

    <!-- Modal confirm delete -->
    <div
      class="modal fade"
      id="deleteTaskModal"
      tabindex="-1"
      aria-labelledby="confirmDeletelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-6" id="confirmDeletelLabel">
              Confirmação
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Deseja realmente excluir esta tarefa?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Não
            </button>
            <button
              @click="deleteTaskSelected"
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-dismiss="modal"
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal confirm -->
  </div>
</template>

<script>
import router from '@/router';
export default {
  data() {
    return {
      msgRegisterError: {
        visible: false,
        text: "",
      },
      taskRegister: {
        title: "",
        description: "",
      },
      taskUpdate: {
        id: 0,
        title: "",
        description: "",
      },
      taskDelete: 0,

      taskList: null,

      paramsGetTask: {
        per_page: 5,
        page: 1,
        search: "",
        current_page: 1,
        pages: [],
        total_page: 0,
        orderFilter: 2,
      },
    };
  },
  methods: {
    registerTask() {
      this.$http
        .post("task/register", this.taskRegister)
        .then((response) => {
          this.taskRegister.title = ''
          this.taskRegister.description = ''
          this.getTasks();
        })
        .catch((error) => {
          console.log(error);
          this.msgRegisterError.text = "Error registering task";
          this.msgRegisterError.visible = true;
        });
    },
    getTasks() {
      this.$http
        .get(
          "task/get" +
            "?per_page=" +
            this.paramsGetTask.per_page +
            "&page=" +
            this.paramsGetTask.page +
            "&search=" +
            this.paramsGetTask.search +
            "&filter=" +
            this.paramsGetTask.orderFilter
        )
        .then((response) => {
          if ((this.taskList = response.data.data.length > 0)) {
            this.taskList = response.data.data;
            this.paramsGetTask.current_page = response.data.current_page;
            this.paramsGetTask.total_page = response.data.last_page;
            this.paramsGetTask.pages = [];

            for (let index = 1; index <= response.data.last_page; index++) {
              this.paramsGetTask.pages.push(index);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTaskById(id) {
      this.$http
        .get("task/get/" + id)
        .then((response) => {
          this.taskUpdate.id = response.data.id;
          this.taskUpdate.title = response.data.title;
          this.taskUpdate.description = response.data.description;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTaskSelected() {
      this.$http
        .put("task/update/" + this.taskUpdate.id, this.taskUpdate)
        .then((response) => {
          this.getTasks();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTaskSelected() {
      this.$http
        .delete("task/delete/" + this.taskDelete)
        .then((response) => {
          this.getTasks();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    selectTastToDelete(id) {
      this.taskDelete = id;
    },

    getTasksByPage(page) {
      this.paramsGetTask.page = page;
      this.getTasks();
    },
    setTaskFilter(order) {
      this.paramsGetTask.orderFilter = order;
      this.getTasks();
    }
  },
  mounted() {
    let user_task = localStorage.getItem("user_task");
    let user = JSON.parse(user_task);
    this.$http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
    this.getTasks();
  },
  computed: {},
};
</script>

<style>
</style>