<script setup lang="ts">
import LazyImg from '@/components/LazyImg.vue'
import { useInfiniteScroll } from '@vueuse/core'

const { isMobile } = useDevice()

const PAGE_SIZE = 10
const page = ref(0)

const { data, pending } = await useFetch(`/api/images`, {
  query: {
    // 1. 依據裝置大小，載入不同大小圖片（SSR用 useDevice，SPA 可用 window.innerWidth）
    width: isMobile ? 400 : 800,

    // 2. 配合滾動加載，使用分頁參數
    limit: PAGE_SIZE,
    offset: page,
  },
  watch: [page],
});

const renderList = ref<{
  title: string;
  src: string;
  placeholder: string;
  id: number
}[]>([])

watch(data, () => {
  renderList.value.push(...data.value!.images)
}, { immediate: true })

const listWrap = ref()
useInfiniteScroll(
  listWrap,
  () => {
    if (pending.value) return
    page.value += 1
  },
  { distance: 100 }
)
</script>

<template>
  <div class="root" ref="listWrap">
    <div class="dashboard">
      <div>length: {{ renderList.length }}</div>
      <div>pending: {{ pending }}</div>
    </div>

    <div class="container">
      <div class="container__item" v-for="(el, idx) in renderList" :key="el.id">
        <p>{{ el.id }}. {{ el.title }}</p>
        <LazyImg :src="el.src" :placeholder="el.placeholder" />
      </div>
    </div>

    <div class="iconLoading">
      <img src="/loading.svg" v-show="pending || renderList.length === 0">
    </div>
  </div>
</template>

<style lang="scss">
.root {
  padding-top: 50px;
  height: 100vh;
  overflow: scroll;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.container__item {
  width: calc(50% - 16px);
  padding: 8px;
}

img {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.iconLoading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  >img {
    background-color: #fff;
    width: 40px;
  }
}

.dashboard {
  padding: 4px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
}
</style>
