<script setup lang="ts">
// import CountTo from './components/CountTo.vue'

</script>

<template>
  <CountTo :startVal="1" :endVal="2000"
    :decimals="2" :separator="','"
    prefix="￥" suffix="rmb" />
  <hr />
</template>

<style scoped>
</style>
