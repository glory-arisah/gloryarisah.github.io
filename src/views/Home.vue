<template>
  <section class="discover-artists">
    <h2>Discover Top Artists</h2>
    <div class="grid">
      <article
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
  <section class="discover-songs">
    <h2>Discover Top Tracks</h2>
    <div class="grid">
      <article v-for="track in $store.getters.firstTenTracks" :key="track.id">
        <img
          :src="track.image[1]['#text']"
          :alt="track.name"
          class="artist__image"
        />
        <p>{{ track.name }}</p>
      </article>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  text-align: center;
  column-gap: 0.7rem;
  row-gap: 1.3rem;
}
.artist__image {
  max-width: 4.5rem;
}
</style>
