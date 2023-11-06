<script setup>
const { data } = await useFetch("/api/images");
// TODO...
</script>

<template>
  <div class="container">
    <div v-for="(img, idx) in data.images" :key="idx" class="container__item">
      <p>{{ img.title }}</p>
      <img :src="img.src" />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.container__item {
  width: calc(50% - 16px);
  padding: 8px;
}

img {
  width: 100%;
}
</style>
