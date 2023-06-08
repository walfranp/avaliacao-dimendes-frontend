<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo.png"
          width="48"
          height="48"
          class="d-inline-block align-top"
          loading="lazy"
        />
        <font style="margin-left: 100%">
          Avaliação técnica DIMENDES - Cadastro de tarefas</font
        >
      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent2">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"></a>
          </li>
        </ul>
        <div class="d-flex" role="search" style="margin-right: 1%">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#"
                ><img
                  src="../assets/user.png"
                  style="width: 32px; height: 32px; border-radius: 50%"
              /></a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ getUserLogged }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item dropdown-item disabled" href="#"
                    >Alterar senha</a
                  >
                </li>
                <li>
                  <a class="dropdown-item dropdown-item disabled" href="#"
                    >Opções</a
                  >
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" @click="logoff" href=""
                    >Fazer Logoff</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      nameUserLogged: "user",
    };
  },
  computed: {
    getUserLogged() {
      let user = JSON.parse(localStorage.getItem("user_task"));
      // console.log(usuario)
      return user.nome;
    },
  },
  methods: {
    logoff() {
      this.$http
        .post("/logout")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("user_task");
      router.push("/login");
    },
  },
  mounted() {
    let user_task = localStorage.getItem("user_task");
    let user = JSON.parse(user_task);
    this.$http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
  },
};
</script>

<style>
</style>