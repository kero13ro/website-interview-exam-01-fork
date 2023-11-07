<script setup lang="ts">
import { useImage } from '@vueuse/core'

const props = defineProps<{
  src: string
  placeholder: string
}>()

const isMounded = ref(false)
const { isLoading, error } = useImage({ src: props.src }, { delay: 3000 })
onMounted(() => {
  isMounded.value = true
})
</script>

<template>
  <div class="LazyImg">
    <transition name="fade">
      <img v-show="isLoading" :src="placeholder" class="skeleton" />
    </transition>
    <div v-if="error" class="error">alt</div>
    <img :src="src" loading="lazy" fetchpriority="low" />
  </div>
</template>

<style>
.LazyImg {
  position: relative;
  overflow: hidden;
}
.LazyImg {
  background-color: #f6f7f8;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
}
.LazyImg::after {
  display: block;
  content: '';
  height: 100%;
  animation: placeholderSkeleton 2s infinite linear;
  background: linear-gradient(90deg, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: cover;
}

@keyframes placeholderSkeleton {
  0% {
    background-position: -50vw 0;
  }

  100% {
    background-position: 70vw 0;
  }
}

.skeleton {
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