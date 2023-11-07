<script setup lang="ts">
import LazyImg from '@/components/LazyImg.vue'
import { useInfiniteScroll } from '@vueuse/core'

const { isMobile } = useDevice()

const PAGE_SIZE = 10
const page = ref(0)

const { data, pending } = await useFetch(`/api/images`, {
  query: {
    width: isMobile ? 400 : 800,
    limit: PAGE_SIZE,
    offset: page.value * PAGE_SIZE,
  },
  watch: [page]
});

const renderList = ref<{
  title: string;
  src: string;
  placeholder: string;
}[]>([])

watch(data, () => {
  console.log(data.value!.images.length)
  renderList.value.push(...data.value!.images)
}, {
  immediate: true
})

const listWrap = ref()
useInfiniteScroll(
  listWrap,
  () => {
    if (pending.value) return
    page.value += 1
  },
  { distance: 10 }
)
</script>

<template>
  <div>length: {{ renderList.length }}</div>
  <div>pending: {{ pending }}</div>
  <div class="container" ref="listWrap">
    <div class="container__item" v-for="(img, idx) in renderList" :key="idx">
      <p>{{ img.title }}</p>
      <LazyImg :src="img.src" :placeholder="img.placeholder" />
    </div>

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
  /* padding: 10px; */
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
