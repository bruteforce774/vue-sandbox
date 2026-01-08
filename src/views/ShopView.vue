<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useCartStore } from '../stores/cartStore';
    import Header from '../components/Header.vue';
    import ProductList from '../components/ProductList.vue';
    const cartStore = useCartStore();
    onMounted(() => {
        cartStore.fetchProducts();
    });
</script>

<template>
    <Header :cart-count="cartStore.cartCount" :current-view="'products'" @view-changed="(view) => console.log('view changed:', view)" />
    <ProductList :products="cartStore.products" @add-to-cart="(productId) => console.log('Add to cart:', productId)" />
</template>

<style scoped>
</style>