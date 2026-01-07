<script setup lang="ts">
import Header from './components/Header.vue'
import ProductList from './components/ProductList.vue';
</script>

<template>
  <Header 
    :cart-count="3" 
    :current-view="'products'" 
    @view-changed="(view) => console.log('view changed:', view)" 
  />
  <ProductList 
    :products="[
      { id: 1, name: 'Product A', price: 100, image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product B', price: 200, image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Product C', price: 300, image: 'https://via.placeholder.com/150' }
    ]" 
    @add-to-cart="(productId) => console.log('Add to cart:', productId)"
    />
</template>