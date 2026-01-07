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

function handleUpdateQuantity(productId: number, quantity: number) {
    emit('update-quantity', productId, quantity)
}

function handleRemoveFromCart(productId: number) {
    emit('remove-from-cart', productId)
}
</script>

<template>
    <div class="host-container">
        <div v-if="items.length === 0" class="container">
            <h2>Your Cart is Empty</h2>
            <a href="#" @click.prevent="goToProducts">Go back to products</a>
        </div>
        <div v-else class="container">
            <h2>Your Cart</h2>
            <div class="cart-items">
                <div v-for="item in items" :key="item.id" class="cart-item">
                    <h4>{{ item.name }}</h4>
                    <p>{{ item.price }} NOK</p>
                    <div class="quantity-controls">
                        <button class="btn btn-small btn-minus">-</button>
                        <input type="number" class="quantity-input" :value="item.quantity" min="1"/>
                        <button class="btn btn-small btn-plus">+</button>
                    </div>
                    <button class="btn btn-danger" @click="removeFromCart(item.id)">Remove</button>
                </div>
            </div>
            <div class="cart-total">
                <h3>Total: {{ total }} NOK</h3>
                <button class="btn" id="checkout">Checkout</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>