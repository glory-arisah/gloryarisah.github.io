<template>
  <section class="similar-artists">
    <h2>Similar Artists</h2>
    <div class="grid">
      <the-loader class="loader" v-if="$store.state.loading" />
      <template v-if="currArtist">
        <article
          v-show="!$store.state.loading"
          v-for="artist in currArtist.similar.artist"
          :key="artist.name"
        >
          <img :src="artist.image[1]['#text']" />
          <p>{{ artist.name }}</p>
        </article>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currArtist: {
      type: Object,
      required: true,
    },
  },
};
</script>
