<template>
  <section class="dscvr dscvr-artist">
    <h2>Discover Top Artists</h2>
    <div class="grid">
      <the-loader v-show="$store.state.loading" class="spinner" />
      <article
        v-show="!$store.state.loading"
        v-for="artist in $store.getters.firstTenArtists"
        :key="artist.id"
      >
        <img
          :src="artist.image[1]['#text']"
          :alt="artist.name"
          class="artist__image"
        />
        <p>{{ artist.name }}</p>
      </article>
    </div>
  </section>
  <section class="dscvr dscvr-track">
    <h2>Discover Top Tracks</h2>
    <div class="grid">
      <the-loader v-show="$store.state.loading" class="spinner" />
      <article
        v-show="!$store.state.loading"
        v-for="track in $store.getters.firstTenTracks"
        :key="track['@attr'].rank"
      >
        <font-awesome-icon
          :icon="['fas', 'compact-disc']"
          :class="{
            'track-icon': true,
            'fa-beat': scaleEffect === track['@attr'].rank,
            animated: true,
          }"
          @mouseover="scaleEffect = track['@attr'].rank"
          @mouseout="scaleEffect = null"
        />
        <p>{{ track.name }}</p>
      </article>
    </div>
  </section>
</template>

<script>
import TheLoader from "../components/TheLoader.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  data() {
    return {
      scaleEffect: null,
    };
  },
  components: {
    TheLoader,
  },
};
</script>

<style lang="scss" scoped>
.dscvr {
  &.dscvr-artist {
    margin-top: 1rem;
    margin-bottom: 5.5rem;
  }
  // heading
  h2 {
    margin: 0 0 1rem 2rem;
    font: {
      family: "Nanum Myeongjo", serif;
      size: 1.25rem;
      weight: 600;
    }
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  text-align: center;
  column-gap: 0.7rem;
  row-gap: 1.3rem;
  // loader
  .spinner {
    margin-top: 1.5rem;
    grid-column: 2 / span 2;
  }
  .artist__image {
    max-width: 4.5rem;
  }
  // compact disc icon
  .track-icon {
    font-size: 3.2rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
  }
}
</style>
