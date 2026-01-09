<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from '../stores/cartStore';
import Header from '../components/Header.vue';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import ProductDetail from '../components/ProductDetail.vue';

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    cartStore.fetchProducts();
});
</script>

<template>
    <div>
        <Header :cart-count="cartStore.cartCount" :current-view="route.name as string"
            @view-changed="(view) => router.push({ name: view })" />
    </div>
    <div v-if="route.name === 'products'">
        <ProductList :products="cartStore.products" @add-to-cart="cartStore.addToCart"
            @view-product="(productId) => router.push({ name: 'product-detail', params: { id: productId } })" />
    </div>
    <div v-else-if="route.name === 'cart'">
        <Cart :items="cartStore.cartItems" :total="cartStore.cartTotal"
            @go-to-products="router.push({ name: 'products' })"
            @update-quantity="(productId, quantity) => cartStore.updateQuantity(productId, quantity)"
            @remove-from-cart="cartStore.removeFromCart" />
    </div>
    <div v-else>
        <ProductDetail :product="cartStore.products.find(p => p.id === Number(route.params.id))"
            @add-to-cart="cartStore.addToCart" />
    </div>
</template>

<style scoped></style>