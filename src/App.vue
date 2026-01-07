<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <Header 
    :cart-count="3" 
    :current-view="'products'" 
    @view-changed="(view) => console.log('view changed:', view)" 
  />
</template>