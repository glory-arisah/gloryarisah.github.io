<template>
  <div class="artist-show--container">
    <the-loader class="loader" v-show="$store.state.loading" />
    <!-- artist bio and image -->
    <template v-if="isCurrArtist">
      <h1>{{ currArtist.name }}</h1>
      <article class="bio" v-show="!$store.state.loading">
        <div class="image--container">
          <img :src="currArtist.photoUrl" :alt="currArtist.name" />
        </div>
        <div class="artist--content">
          <p v-html="currArtist.bio.summary"></p>
        </div>
      </article>
    </template>
    <!-- artist albums -->
    <top-albums :curr-artist="currArtist" :key="$route.params.artist" />
    <!-- similar artists -->
    <similar-artists :curr-artist="currArtist" :key="$route.params.artist" />
  </div>
</template>

<script>
import SimilarArtists from "../components/SimilarArtists.vue";
import TopAlbums from "../components/TopAlbums.vue";
import TheLoader from "../components/TheLoader.vue";
export default {
  data() {
    return {
      scaleEffect: null,
    };
  },
  async created() {
    await Promise.all([
      this.$store.dispatch("getArtistInfo", this.$route.params.artist),
      this.$store.dispatch("getArtistAlbums", this.$route.params.artist),
    ]);
  },
  computed: {
    currArtist() {
      return this.$store.state.currentArtist;
    },
    isCurrArtist() {
      return Object.keys(this.currArtist).length > 0;
    },
  },
  components: {
    TheLoader,
    TopAlbums,
    SimilarArtists,
  },
};
</script>

<style lang="scss">
@mixin responsive($query) {
  @media (min-width: $query) {
    @content;
  }
}
.artist-show--container {
  margin-top: 3.5rem;
  // top albums container
  .bio {
    // artist image
    img {
      // max-width: 252px;
    }
    // artist bio summary
    p {
      text-align: justify;
    }
  }
  .top-albums {
    margin-top: 3.5rem;
  }
  // loader
  .loader {
    text-align: center;
    grid-column: 2 / span 2;
  }
  // album icons
  .track-icon {
    padding: 0.3rem 0.1rem;
    border-radius: 5px;
    border: 1.5px solid black;
  }
}
</style>
