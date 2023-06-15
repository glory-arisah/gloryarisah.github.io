<template>
  <section class="top-albums">
    <h2>Top Albums</h2>
    <section class="grid">
      <the-loader class="loader" v-if="$store.state.loading" />
      <template v-if="isCurrArtist">
        <article
          v-show="!$store.state.loading"
          v-for="album in $store.state.currArtistAlbums"
          :key="album.name"
        >
          <font-awesome-icon
            :icon="['fas', 'compact-disc']"
            :class="{
              'track-icon': true,
              'fa-beat': scaleEffect === album['name'],
              animated: true,
            }"
            @mouseover="scaleEffect = album['name']"
            @mouseout="scaleEffect = null"
          />
          <p>{{ album.name }}</p>
        </article>
      </template>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TheLoader from "./TheLoader.vue";
export default {
  name: "TopAlbums",
  data() {
    return {
      scaleEffect: null,
    };
  },
  props: {
    currArtist: {
      type: Object,
      required: true,
    },
  },
  components: {
    TheLoader,
  },
  computed: {
    ...mapGetters(["isCurrArtist"]),
  },
};
</script>

<style scoped></style>
