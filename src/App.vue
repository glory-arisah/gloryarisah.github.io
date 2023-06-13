<template>
  <div class="wrapper">
    <the-navigation />
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
export default {
  components: {
    TheNavigation,
  },
  created() {
    this.$store.dispatch("getTopArtistsAndTracks");
  },
};
</script>

<style scoped></style>
