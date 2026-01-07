<script setup lang="ts">
    import type { Product } from '../types';

    defineProps<{
        products: Product[]
    }>()

    const emit = defineEmits<{
        'add-to-cart': [number]
    }>()
</script>

<template>
    <div class="host-container">
        <div class="container">
                <h2>Our Products</h2>
                <div class="product-grid">
                    <div v-for="product in products" :key="product.id" class="product-card">
                        <img :src="product.image" :alt="product.name">
                        <h3>{{ product.name }}</h3>
                        <p>{{ product.price }} NOK</p>
                            <button class="btn" :productId="product.id">Legg i handlevogn</button>
                        </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
</style>