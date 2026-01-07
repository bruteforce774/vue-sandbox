<script setup lang="ts">
defineProps<{
    cartCount: number,
    currentView: string
}>()

const emit = defineEmits<{
    'view-changed': [view: string]
}>()

function handleViewChange(view: string) {
    emit('view-changed', view)
}
</script>

<template>
    <header class="header-container">
        <div class="header-content">
            <div class="logo">Legacy Butikk</div>
            <nav>
                <a :class="{ active: currentView === 'products' }" @click="handleViewChange('products')">Produkter</a>
                <a :class="{ active: currentView === 'cart' }" @click="handleViewChange('cart')">Handlekurv ({{
                    cartCount }})</a>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header-container {
    display: block;
    background-color: #333;
    color: white;
    padding: 1rem;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
    cursor: pointer;
}

nav a:hover {
    text-decoration: underline;
}

nav a.active {
    font-weight: bold;
}
</style>