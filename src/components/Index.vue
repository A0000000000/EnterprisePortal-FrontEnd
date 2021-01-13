<template>
  <div class="index">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello ",
    };
  },
  mounted() {
    this.$store.dispatch("requestMessage", {
      callback: (data) => {
        console.log(data);
        this.message = this.message + this.$store.getters.getMessage;
      },
    });
  },
};
</script>

<style scoped>
</style>
