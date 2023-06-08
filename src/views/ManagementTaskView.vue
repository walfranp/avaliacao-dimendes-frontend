<template>
  <div>
    <navigation-bar />
    <registration-form />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

export default {
  components: {
    NavigationBar,
    RegistrationForm,
  },
};
</script>

<style>
</style>
