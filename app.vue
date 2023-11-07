<template>
  <div>
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </div>
</template>


<style>
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


</style>