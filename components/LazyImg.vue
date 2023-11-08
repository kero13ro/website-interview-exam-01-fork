<script setup lang="ts">
import { useImage } from '@vueuse/core'

const props = defineProps<{
  src: string
  placeholder: string
}>()

const { isLoading, error } = useImage({ src: props.src }, {
   delay: 1000
})
</script>
<!-- 若正規圖片尚未加載，使用 模糊縮圖 -->
<!-- 若模糊縮圖尚未加載，使用 骨架動畫 -->
<template>
  <div class="LazyImg skeleton">
    <transition name="fade">
      <img v-show="isLoading" :src="placeholder" class="blurImg" />
    </transition>
    <div v-if="error" class="error">alt title</div>
    <img :src="src" loading="lazy" fetchpriority="low" />
  </div>
</template>

<style lang="scss">
.LazyImg {
  position: relative;
  overflow: hidden;
}

.blurImg {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(1.5);
  filter: blur(20px);
}

.error {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>