<template>
  <div class="spinner">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </div>
</template>

<script>
export default {
  name: "TheLoader",
};
</script>

<style scoped>
.spinner {
  font-size: 3.5rem;
}
</style>
