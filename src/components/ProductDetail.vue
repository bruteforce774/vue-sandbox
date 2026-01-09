<script setup lang="ts">
import type { Product } from '../types.ts'

const props = defineProps<{
  product: Product | undefined
}>()

const emit = defineEmits<{
    'add-to-cart': [productId: number]
}>()
</script>

<template>
    <div v-if="product">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price.toFixed(2) }}</p>
        <button @click="$emit('add-to-cart', product.id)">Add to Cart</button>
    </div>
    <div v-else>
        <p>Product not found.</p>
    </div>
</template>

<style scoped>
</style>