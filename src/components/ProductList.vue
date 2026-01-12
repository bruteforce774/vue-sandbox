<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { Product } from '../types';

const props = defineProps<{
    products: Product[]
}>()

const searchTerm = ref('')
const filteredProducts = computed(() => {
    if (!searchTerm.value) {
        return products
    }
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})

const emit = defineEmits<{
    'add-to-cart': [productId: number],
    'view-product': [productId: number]
}>()

function handleAddToCart(productId: number) {
    emit('add-to-cart', productId)
}

function handleViewProduct(productId: number) {
    emit('view-product', productId)
}
</script>

<template>
    <div class="host-container">
        <div class="container">
            <h2>Our Products</h2>
            <div class="search-bar">
                <input type="text" 
                        v-model="searchTerm" 
                        placeholder="Search products..."
                />
            </div>
            <div class="product-grid">
                <div v-for="product in filteredProducts" :key="product.id" class="product-card">
                    <img :src="product.image" :alt="product.name" @click="handleViewProduct(product.id)">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.price }} NOK</p>
                    <button class="btn" @click="handleAddToCart(product.id)">Legg i handlevogn </button>
                </div>
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

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
}

.product-card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.product-card img {
    max-width: 100%;
    border-radius: 4px;
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
</style>
