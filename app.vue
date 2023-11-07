<template>
  <div>
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </div>
</template>


<style lang="scss">
body {
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.skeleton {
  background-color: #f6f7f8;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  &::after {
    display: block;
    content: '';
    height: 100%;
    animation: placeholderSkeleton 2s infinite linear;
    background: linear-gradient(90deg, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: cover;
  }
}

@keyframes placeholderSkeleton {
  0% {
    background-position: -50vw 0;
  }

  100% {
    background-position: 70vw 0;
  }
}

</style>