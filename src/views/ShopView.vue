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
    <Header :cart-count="cartStore.cartCount" :current-view="'products'" />
    <ProductList :products="cartStore.products"/>
</template>

<style scoped>
</style>