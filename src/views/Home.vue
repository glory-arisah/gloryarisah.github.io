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
        <router-link
          :to="{ name: 'Artist.show', params: { artist: artist.name } }"
        >
          <img
            :src="artist.image[1]['#text']"
            :alt="artist.name"
            class="artist__image"
          />
          <p>{{ artist.name }}</p>
        </router-link>
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
}
.grid {
  // all link tags
  a {
    text-decoration: none;
    color: #01295f;
    &:hover {
      color: #7dbbc3;
    }
  }
  // loader
  .spinner {
    grid-column: 2 / span 2;
  }
  .artist__image {
    max-width: 4.5rem;
  }
  // compact disc icon
}
</style>
