<template>
  <section class="nav-bar">
    <p><router-link to="/">music app</router-link></p>
    <div class="btns">
      <span class="btn btn_artist">Artists</span>
      <span class="btn btn_song">Songs</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "TheNavigation",
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f4b9b2;
  padding-block: 1.1rem;
  // music app logo
  p {
    text-transform: uppercase;
    cursor: pointer;
    font : {
      weight: bolder;
      family: cursive;
      size: 1.1rem;
    }
    a {
      text-decoration: none;
      color: #853542;
      &:hover {
        color: #a64253;
      }
    }
  }
  // buttons
  .btns {
    width: 30%;
    display: flex;
    justify-content: space-evenly;
    span {
      color: #000;
      font-family: cursive, "sans-serif";
      cursor: pointer;
      .router-link-active {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
