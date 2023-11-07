<script setup lang="ts">
import LazyImg from '@/components/LazyImg.vue'
import { useInfiniteScroll } from '@vueuse/core'

const { isMobile } = useDevice()

const limit = ref(30)

const { data, pending } = await useFetch(`/api/images`, {
  query: {
    width: isMobile ? 500 : 1000,
    limit,
  },
  watch: [limit]
});

const listWrap = ref()
useInfiniteScroll(
  listWrap,
  () => {
    if (pending.value) return
    limit.value = limit.value + 30
  },
  { distance: 10 }
)
</script>

<template>
  <div>length: {{ data?.images.length }}</div>
  <div>pending: {{ pending }}</div>
  <div class="container" ref="listWrap">
    <LazyImg
      v-for="(img, idx) in data?.images"
      :key="idx"
      :src="img.src"
      :placeholder="img.placeholder"
      class="container__item"
    />
    
    <!-- <div
      v-for="(img, idx) in data?.images"
      :key="idx"
      :src="img.src"
      :placeholder="img.placeholder"
      class="container__item"
    >
      <p>{{ img.title }}</p>
      <img :src="img.src" loading="lazy" fetchpriority="low" />
    </div> -->
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
  overflow: scroll;
  padding: 10px;
}

.container__item {
  width: calc(50% - 16px);
  padding: 8px;
}

img {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #ddd;
}
</style>
