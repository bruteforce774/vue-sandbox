<script setup lang="ts">
    import type { CartItem } from '../types';

    defineProps<{
        items: CartItem[],
        total: number
    }>()

    const emit = defineEmits<{
    'go-to-products': [],
    'update-quantity': [productId: number, quantity: number],
    'remove-from-cart': [productId: number]
}>()

    function goToProducts() {
        emit('go-to-products')
    }

    function updateQuantity(productId: number, quantity: number) {
        emit('update-quantity', productId, quantity)
    }

    function removeFromCart(productId: number) {
        emit('remove-from-cart', productId)
    }
</script>

<template>
    <div class="host-container">
        <div v-if="items.length === 0" class="container">
            <h2>Your Cart is Empty</h2>
            <a href="#" @click.prevent="goToProducts">Go back to products</a>
        </div>
    </div>
</template>

<style scoped>
</style>