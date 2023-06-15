<template>
  <div class="wrapper">
    <the-navigation />
    <main class="main">
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
export default {
  components: {
    TheNavigation,
  },
  async created() {
    await Promise.all([
      this.$store.dispatch("getTopArtistsAndTracks"),
      this.$store.dispatch("getArtistsPhotos"),
    ]);
  },
};
</script>

<style scoped></style>
