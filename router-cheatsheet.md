# Vue Router Basics

## Setup in main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

---

## Create Router

```typescript
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [ ... ],
});

export default router;
```

---

## Define Routes

```typescript
routes: [
  {
    path: "/",
    name: "home",
    component: BookListView,
  },
  {
    path: "/book/:id",
    name: "book-detail",
    component: BookDetailView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
],
```

---

## router-view (where component renders)

```vue
<template>
  <router-view></router-view>
</template>
```

---

## router-link (navigation)

```vue
<router-link to="/">Home</router-link>
<router-link to="/cart">Cart</router-link>
<router-link to="/book/5">Book 5</router-link>
```

---

## Get Route Parameter

```typescript
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
```

---

## Navigate in Code

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

router.push('/cart')
router.push(`/book/${id}`)
```

---

## Fetch on Mount

```typescript
import { onMounted } from 'vue'
import { useBookStore } from '../stores/bookStore'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.fetchBooks()
})
```

---

## Loading State in Template

```vue
<p v-if="bookStore.isLoading">Loading...</p>
<p v-if="bookStore.errorMessage">Error: {{ bookStore.errorMessage }}</p>
<div v-if="!bookStore.isLoading">
  <!-- content -->
</div>
```

---

## Key Rules

- `useRoute()` = where am I? (read params)
- `useRouter()` = go somewhere (navigate)
- `<router-view>` = where component renders
- `<router-link>` = clickable link
- `onMounted()` = fetch data when view loads
