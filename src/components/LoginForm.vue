<template>
  <div class="row justify-content-center mt-5">
    <div class="col-3">
      <nav>
        <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Login
          </button>
          <button
            class="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Novo usuário
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div class="col-10 offset-1">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <b>Login</b>
              </div>
              <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>

                <div
                  v-if="msgLogin.visible"
                  class="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {{ msgLogin.text }}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>

                <form
                  @submit.prevent="login"
                  id="login"
                  class="login"
                  name="login"
                >
                  <label for="usuario">Usuario:</label>
                  <input
                    v-model="userLogin.email"
                    class="form-control form-control-sm mb-1"
                    type="email"
                    id="usuario"
                    name="usuario"
                    required
                  />

                  <label for="senha">Senha:</label>
                  <input
                    v-model="userLogin.password"
                    class="form-control form-control-sm mb-3"
                    type="password"
                    id="senha"
                    name="senha"
                    required
                  />

                  <button
                    class="btn btn-primary mb-1 btn-sm"
                    type="submit"
                    id="enviar"
                    name="enviar"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >

          <div class="card">
            <div class="card-header bg-primary text-white">
              <b>Cadastrar usuário</b>
            </div>
            <div class="card-body">
              <h5 class="card-title"></h5>
          <div
            v-if="msgRegister.visible"
            class="alert alert-dismissible alert-info fade show"
            role="alert"
          >
            {{ msgRegister.text }}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>

          <div
            v-if="msgRegisterError.visible"
            class="alert alert-dismissible alert-danger fade show"
            role="alert"
          >
            {{ msgRegisterError.text }}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>

              <form
                @submit.prevent="registerUser"
                id="cadastro"
                class="cadUsuario"
                name="cadastro"
              >
                <label for="nome">Nome:</label>
                <input
                  v-model="userRegister.nome"
                  class="form-control form-control-sm mb-1"
                  type="text"
                  id="nome"
                  name="nome"
                  required
                />

                <label for="email">Email:</label>
                <input
                  v-model="userRegister.email"
                  class="form-control form-control-sm mb-1"
                  type="email"
                  id="email"
                  name="email"
                  required
                />

                <label for="senhaCadastro">Senha:</label>
                <input
                  v-model="userRegister.password"
                  class="form-control form-control-sm mb-1"
                  type="password"
                  id="senhaCadastro"
                  name="senhaCadastro"
                  required
                />

                <label for="confirmasenha">Confirme a senha:</label>
                <input
                  v-model="userRegister.confirmPassword"
                  class="form-control form-control-sm mb-3"
                  type="password"
                  id="confirmasenha"
                  name="confirmasenha"
                  required
                />

                <button
                  class="btn btn-primary mb-1 btn-sm"
                  type="submit"
                  id="cadastrar"
                  name="cadastrar"
                >
                  Cadastrar usuário
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      msgRegister: {
        visible: false,
        text: "",
      },
      msgRegisterError: {
        visible: false,
        text: "",
      },
      msgLogin: {
        visible: false,
        text: "",
      },
      userLogin: {
        email: "",
        password: "",
      },
      userRegister: {
        nome: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post("/login", this.userLogin)
        .then((response) => {
         
         let user = {
            token: response.data.token,
            nome: response.data.usuario.name,
            email: response.data.usuario.email 
          }

          localStorage.setItem('user_task', JSON.stringify(user));

           router.push("/management");

        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            this.msgLogin.text = "Usuário ou senha incorretos!";
            this.msgLogin.visible = true;
          } else {
            this.msgLogin.text = "Server error!";
            this.msgLogin.visible = true;
          }
        });
    },

    registerUser() {
      if (this.userRegister.password == this.userRegister.confirmPassword) {
        console.log(this.userRegister);
        this.$http
          .post("user/register", this.userRegister)
          .then((response) => {

            this.msgRegister.text = "Registered user!";
            this.msgRegister.visible = true;
          })
          .catch((error) => {
            console.log(error);
            this.msgRegisterError.text = "Error registering user";
            this.msgRegisterError.visible = true;
          });
      }else{
            this.msgRegisterError.text = "Passwords don't match!";
            this.msgRegisterError.visible = true;
      }
    },
  },
};
</script>

<style>
.login {
  text-align: left;
}
.cadUsuario {
  text-align: left;
}
</style>