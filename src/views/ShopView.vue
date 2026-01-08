<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useCartStore } from '../stores/cartStore';
    import Header from '../components/Header.vue';
    import ProductList from '../components/ProductList.vue';
    import Cart from '../components/Cart.vue';
    
    const cartStore = useCartStore();
    const currentView = ref('products');

    onMounted(() => {
        cartStore.fetchProducts();
    });
</script>

<template>
    <div>
        <Header :cart-count="cartStore.cartCount" :current-view="currentView" @view-changed="(view) => currentView = view" />
    </div>
    <div v-if="currentView === 'products'">
        <ProductList :products="cartStore.products" @add-to-cart="cartStore.addToCart" />
    </div>
    <div v-else>
        <Cart :items="cartStore.cartItems" :total="cartStore.cartTotal" />
    </div>
</template>

<style scoped>
</style>