<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
