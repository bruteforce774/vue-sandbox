<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        cartCount: number,
        currentView: string
    }>()

    const emit = defineEmits<{
        'view-changed': [string]
    }>()
</script>

<template>
    <div class="header-content">
        <div class="logo">Legacy Butikk</div>
        <nav>
            <a data-view="products" class="${currentView === 'products' ? 'active' : ''}">Produkter</a>
            <a data-view="cart" class="${currentView === 'cart' ? 'active' : ''}">Handlekurv (${cartCount})</a>
        </nav>
    </div>
</template>

<style scoped>
    :host {
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