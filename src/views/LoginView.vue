<template class="background">
  <div class="login">
    <login-form />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import router from "@/router";

export default {
  components: {
    LoginForm,
  },

  data() {
    return {};
  },
  mounted() {
    let user_task = localStorage.getItem("user_task");
    if (user_task) {
      router.push("/management");
    }
  },
};
</script>

<style>
</style>