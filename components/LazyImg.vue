<script setup lang="ts">
  import { useImage } from '@vueuse/core'

  const props = defineProps<{
    src: string
    placeholder: string
  }>()

  const { isLoading, error } = useImage({ src: props.src }, { delay: 3000 })
</script>

<template>
  <div>
    <img
      v-if="isLoading"
      :src="placeholder"
      class="skeleton"
    />
    <div
      v-else-if="error"
      class="bg-black"
    ></div>
    <img
      v-else
      :src="src"
    />
  </div>
</template>
