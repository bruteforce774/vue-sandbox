# Pinia Basics (Composition API)

## Setup in main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

---

## Define a Store (Composition API)

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state, actions, getters here
  return { /* expose everything */ }
})
```

---

## State (use ref)

```typescript
const count = ref(0)
const items = ref<Item[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
```

---

## Actions (regular functions)

```typescript
function increment() {
  count.value++
}

function decrement() {
  if (count.value > 0) count.value--
}
```

---

## Getters (use computed)

```typescript
const doubleCount = computed(() => count.value * 2)
```

---

## Getter with List

```typescript
const totalBooks = computed(() => items.value.length)

const totalValue = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
```

---

## Getter Function (for lookup by id)

```typescript
function getItemById(id: number) {
  return items.value.find(item => item.id === id)
}
```

---

## Async Action (fetch)

```typescript
async function fetchItems() {
  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await fetch('/items.json')
    if (!response.ok) throw new Error('Failed to load')
    items.value = await response.json()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
  } finally {
    isLoading.value = false
  }
}
```

---

## Return (expose everything)

```typescript
return {
  // State
  count,
  items,
  isLoading,
  errorMessage,
  // Actions
  increment,
  decrement,
  fetchItems,
  // Getters
  doubleCount,
  totalBooks,
  totalValue,
  getItemById
}
```

---

## Full Store Example

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Book } from '../types'

export const useBookStore = defineStore('books', () => {
  const books = ref<Book[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  async function fetchBooks() {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await fetch('/books.json')
      if (!response.ok) throw new Error('Failed to load')
      books.value = await response.json()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  function updateQuantity(id: number, quantity: number) {
    const book = books.value.find(b => b.id === id)
    if (book) book.quantity = quantity
  }

  function removeBook(id: number) {
    books.value = books.value.filter(b => b.id !== id)
  }

  const totalBooks = computed(() => books.value.length)
  const totalValue = computed(() =>
    books.value.reduce((sum, b) => sum + b.price * b.quantity, 0)
  )

  return {
    books,
    isLoading,
    errorMessage,
    fetchBooks,
    updateQuantity,
    removeBook,
    totalBooks,
    totalValue
  }
})
```

---

## Use Store in Component

```typescript
import { useBookStore } from './stores/bookStore'

const store = useBookStore()
```

---

## Access State/Getters (same as before)

```vue
<p>{{ store.totalBooks }}</p>
<p>{{ store.totalValue }}</p>
```

---

## Call Actions (same as before)

```vue
<button @click="store.increment()">+</button>
```

---

## Key Difference: .value

```typescript
// Inside store: use .value
count.value++
items.value.push(item)

// In template: no .value needed
{{ store.count }}
```

---

## Options → Composition Cheat

| Options API | Composition API |
|-------------|-----------------|
| `state: () => ({ count: 0 })` | `const count = ref(0)` |
| `this.count++` | `count.value++` |
| `getters: { double(state) {...} }` | `const double = computed(() => ...)` |
| `actions: { increment() {...} }` | `function increment() {...}` |
| *(nothing)* | `return { count, double, increment }` |

---

## Key Rules

- **State** = `ref()`
- **Getters** = `computed()`
- **Actions** = regular `function`
- **Always** use `.value` inside the store
- **Always** return everything you want to expose
