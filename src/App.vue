<template>
  <transition name="slide-fade">
    <router-view></router-view>
  </transition>
</template>

<script>

export default {
  name: "App",
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .5s ease-in;
  opacity: 1;
  display: block;
}
.slide-fade-leave-active {
  transition: all .5s, ease-out;
  display: none;
  opacity: 0;

}
.slide-fade-enter, .slide-fade-leave-active {
  opacity: 0;
}
</style>