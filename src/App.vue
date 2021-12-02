<template>
  <router-view class="" style="background-color: third" />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {
    this.$store.dispatch("uniChat/getMenu");
  },
});
</script>
