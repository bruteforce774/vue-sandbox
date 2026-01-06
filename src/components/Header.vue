<script setup lang="ts">
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
            <a class="active: currentView === 'products'">Handlekurv ({{ cartCount }})</a>
            <a class="active: currentView === 'cart'">Produkter</a>
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