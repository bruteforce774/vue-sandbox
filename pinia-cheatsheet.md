# Pinia Basics

## Setup in main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

---

## Define a Store

```typescript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({ ... }),
  actions: { ... },
  getters: { ... },
});
```

---

## State

```typescript
state: (): CounterState => ({
  count: 0,
}),
```

---

## Actions

```typescript
actions: {
  increment() {
    this.count++;
  },
  decrement() {
    if (this.count > 0) 
      this.count--;
  },
},
```

---

## Getters

```typescript
getters: {
  doubleCount(state): number {
    return state.count * 2;
  },
},
```

---

## Getter with List

```typescript
getters: {
  totalBooks(state): number {
    return state.books.length;
  },
  totalInventoryValue(state): number {
    return state.books.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
  },
},
```

---

## Async Action (fetch)

```typescript
async fetchBooks() {
  this.isLoading = true
  this.errorMessage = null
  try {
    const response = await fetch("/books.json")
    if (!response.ok) throw new Error("Failed to load")
    this.books = await response.json()
  } catch (error) {
    this.errorMessage = error instanceof Error ? error.message : "Unknown error"
  } finally {
    this.isLoading = false
  }
},
```

---

## Use Store in Component

```typescript
import { useCounterStore } from './stores/counterStore'

const counterStore = useCounterStore()
```

---

## Read State and Getters

```vue
<p>{{ counterStore.count }}</p>
<p>{{ counterStore.doubleCount }}</p>
```

---

## Call Actions

```vue
<button @click="counterStore.increment()">+</button>
```

---

## Pass Store Data as Props

```vue
<CounterView
  :count="counterStore.count"
  :doubleCount="counterStore.doubleCount"
  @increment="counterStore.increment()"
  @decrement="counterStore.decrement()"
/>
```

---

## Define Props

```typescript
const props = defineProps<{
  count: number,
  doubleCount: number
}>()
```

---

## Define Emits

```typescript
const emits = defineEmits<{
  increment: [],
  decrement: []
}>()
```

---

## Emit Events

```vue
<button @click="emits('increment')">Increment</button>
```

---

## Key Rules

- **State** = stored data
- **Getters** = calculated from state  
- **Actions** = change state
- **Container** knows the store, passes props down
- **Presentation** only gets props and emits events
