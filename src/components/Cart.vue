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

function handleInputChange(productId: number, event: Event) {
    const value = Number((event.target as HTMLInputElement).value)
    emit('update-quantity', productId, Math.max(1, value))
}

function handleCheckout() {
    alert('Checkout not implemented yet');
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
                        <button class="btn btn-small btn-minus"
                            @click="handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))">-</button>
                        <input type="number" class="quantity-input" :value="item.quantity" min="1"
                            @change="handleInputChange(item.id, $event)" />
                        <button class="btn btn-small btn-plus"
                            @click="handleUpdateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                    <button class="btn btn-danger" @click="handleRemoveFromCart(item.id)">Remove</button>
                </div>
            </div>
            <div class="cart-total">
                <h3>Total: {{ total }} NOK</h3>
                <button class="btn" @click="handleCheckout" id="checkout">Checkout</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.host-container {
    display: block;
}

.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-input {
    width: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.25rem;
}

.btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
}

.btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
}

.btn:hover {
    background-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
}

.btn-danger:hover {
    background-color: #a71d2a;
}

.cart-total {
    margin-top: 1rem;
}

a {
    color: #007bff;
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}
</style>