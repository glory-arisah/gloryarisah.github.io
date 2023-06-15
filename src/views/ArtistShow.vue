<template>
  <div class="artist-show--container">
    <the-loader class="loader" v-show="$store.state.loading" />
    <!-- artist bio and image -->
    <template v-if="isCurrArtist">
      <article class="bio" v-show="!$store.state.loading">
        <div>
          <img :src="currArtist['image'][2]['#text']" :alt="currArtist.name" />
        </div>
        <div>
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
.artist-show--container {
  margin-top: 3.5rem;
  // top albums container
  .top-albums {
    margin-top: 3.5rem;
  }
  // loader
  .loader {
    text-align: center;
    grid-column: 2 / span 2;
  }
  .bio {
    display: flex;
    align-items: flex-start;

    // artist image
    img {
      height: fit-content;
    }
    // artist bio summary
    p {
      margin-left: 1.4rem;
      text-align: justify;
    }
  }
  // album icons
  .track-icon {
    padding: 0.3rem 0.1rem;
    border-radius: 5px;
    border: 1.5px solid black;
  }
}
</style>
