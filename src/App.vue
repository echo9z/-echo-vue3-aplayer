<script lang="ts" setup>
// import CountTo from './components/CountTo.vue'

</script>

<template>
  <CountTo :startVal="1" :endVal="2023" :duration="4000"
    :decimals="0" :separator="','"
    prefix="usd:" suffix="$" />
  <hr />
</template>

<style scoped>
</style>
